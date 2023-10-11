/* RUN THIS DEMO */
/* Partitioning is just Breaking large tables into smaller child table for easier and faster indexing and querying */
/* Below is a Demo for a Horizontal partition, using rows to split the table by range(scores?) or by list(zipcode?)  */
/** use docker to spin up a postgres instance, detached (running in the background)
 and set env variable like password, set db --name, then name the image finally
 */
sudo docker run --name pgshardingdemo -d -e POSTGRES_PASSWORD=postgres postgres
/* check image status */
sudo docker ps
/* bash into the docker container */
sudo docker exec - it pgshardingdemo bash
/* To stop the container - sudo docker stop pgshardingdemo  */
/* open the postgres instance as user previously set  */
psql - U postgres
/* CREATE TABLE  */
create table grades_ori (id serial not null, g int not null);
/* insert a million rows of grades(g) randomly generated */
insert into grades_ori(g)
select floor(random() * 100)
from generate_series(0, 10000000);
/* CREATE INDEX  */
create index grades_ori_index on grades_ori(g);
/* check tables or test index or explain and analyse */
\ d
select count(*)
from grades_ori
where g = 30;
explain analyze
select count(*)
from grades_ori
where g = 30;
explain analyze
select count(*)
from grades_ori
where g between 30 and 35;
/* STEPS TO CREATE PARTITIONS  */
create table grades_parts (id serial not null, g int not null) partition by range(g);
create table g0035 (like grades_parts including indexes);
\ d g0035 create table g3560 (like grades_parts including indexes);
create table g6080 (like grades_parts including indexes);
create table g80100 (like grades_parts including indexes);
alter table grades_parts attach partition g0035 for
values
from (0) to (35);
alter table grades_parts attach partition g3560 for
values
from (35) to (60);
alter table grades_parts attach partition g6080 for
values
from (60) to (80);
alter table grades_parts attach partition g80100 for
values
from (80) to (100);
\ d g80100;
\ d grades_parts;
\ d + grades_parts;
insert into grades_parts
select *
from grades_ori;
select count(*)
from grades_parts;
select max(g)
from grades_parts;
select max(g)
from g0035;
select count(*)
from g0035;
select max(g)
from g3560;
select count(*)
from g3560;
/* create index on all partitions by creating on the root partition*/
create index grades_parts_idx on grades_parts(g);
\ d grades_parts;
\ d g0035;
/* the below only hits the first partition so it's way faster */
explain analyze
select count(*)
from grades_parts
where g = 30;
/* check the size of relations using pg native methods and Object ID */
select pg_relation_size(oid),
  relname
from pg_class
order by pg_relation_size(oid) desc;
/* this might not be much, but imagine these datasize being way larger, say hundreds of gigs instead of mbs, notice how the individual indexes on partitions are waay smaller than the original index, 69mb to 24mb, so querying the partions are waay faster */
/* this has to be 'on' so as to hit just one partiton, the necessary one, else, it will waste time saved and hit all partitions */
show ENABLE_PARTITION_PRUNING;
/** PROS OF PARTITIONING
 * improves query performance when accessing a single partition
 * Sequential scan vs scattered index scan (based on size, db plans and decides)
 * Easy bulk loading (attach partition - only available in MySQL and MariaDB, e.g, attch a CSV file and query it through some complex logic)
 * Archive old data that are barely accessed into cheap storage
 */
/** CONS OF PARTITIONING
 * Updates that moves rows from one partition to another (slow or fail sometimes)
 * Inefficient queries could accidently scan all partitions resulting in slower performance (e.g, "select * from grades_parts where id > 1" will scan all partitions, etc...)
 * Schema changes can be challenging (DBMS could manage it though)
 */