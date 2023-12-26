---
title: Eco Ops Metadata Open Format
subtitle: Improve environment map plastics and organics to upcycle & restore land
category:
  - About Eco Ops
author: Greg Willson
date: 2023-11-20T04:20:11.800Z
featureImage: /uploads/home-hero.jpg
---
The 'Eco Ops app' uses the following data formats for compiling project data.  We are currently testing with data written to ipfs via nft.storage  24 Dec 2024
Please check out https://ecocity.com/kath4b to use the current data input tool.

| Prop     | Description                                          | Input URL     | Fields     | Example Metadata File |
| -------- | ---------------------------------------------------- | ------ | ----------------- |
| garbageMap   | garbage related resource map item              | Number | location, time, mapper, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/a4945e0a49b2695b861c85dae38834bc |
| wqMap   | water quality related resource map item                 | Number | location, time, mapper, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/8846460606990f13c3b7b64d26c4b3bf |
| farmMap | farm practice set as a goal for climate credit  | Array  | activity, milestone, compensation method, location, time, time duration, mapper, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/bc14a8bb06bb01019dc6270cdfb6d207 |
| productMap | the resource being produced making use of circular           | String | activity, location, time, retail value of item, number of items, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/d5c6b54a34b26ad58b6cf40b510ffe43 |
| transportMap | the resource being moved from point a to b           | String | activity, driver pay, payment receipt, receiving location, source location, departure time, arrval time, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/7b40ac77101e07c24202b4edd74b3942 |
| storageMap | the resource stored, and placed in specific location           | String | activity, driver pay, payment receipt, receiving location, source location, departure time, arrval time, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/ce7773d941951dd22fcae981cc394bcd |
| sourceMap | source of items of interest in project | String | item name, item provider, material cost, unit of measure, payment receipt, recieving location, source location, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/a56d1df413a219833383654ecb8ddb2b |
| cleaningMap | the human contact with items of interest in project | String | activity, service provider, cleaning pay, payment receipt, receiving location, source location, departure time, arrval time, group, project, photo(s), video(s), url, info url | https://gist.github.com/biomassives/a27b818ba8a4ab37076ac8425dc5fdf4 |



```
