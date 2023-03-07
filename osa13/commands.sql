CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULt 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'www.test.test', 'Writing Resilient Components');
insert into blogs (author, url, title) values ('Martin Fowler', 'www.test.test', 'Is High Quality Software Worth the Cost?');
insert into blogs (author, url, title) values ('Robert C. Martin', 'www.test.test', 'FP vs. OO List Processing');
