So it appears Ghost doesn't offer an API call to backup your entire blog, and I really don't like the idea of backing up to the same service hosting the Blog. With that in mind I wrote a short script using Playwright to login to the admin panel, and export the blog's data.  Once the scripts done, it'll upload the data as an action artifact.

This is really rough, but it get's the job done. MIT, so feel free to use it commercially.

Set these 3 variables:

GHOST_LAB_URL: ${{ secrets.GHOST_LAB_URL }}   // Your Ghost url GHOST_LAB_USERNAME: ${{ secrets.GHOST_LAB_USERNAME }}     GHOST_LAB_PASSWORD: ${{ secrets.GHOST_LAB_PASSWORD }}
