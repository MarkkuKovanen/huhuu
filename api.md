# API Documentation
## /post/
Method:`GET` URL:`/post/?user=username&start=0&count=20`

Returns postings of a given user in ascending order by time from `start` to
`start + count - 1`.

Start defaults to 0.

If count defaults to `DEFAULT`

If count is over `MAX` only `MAX` posts are returned.

------------------------------------------------------------------------

Kokeilu konflikti

Method:`POST` URL:`/post/`

Body:

``` json
{
    message: STRING,
    image: BINARY
}
```

Adds a new post.
