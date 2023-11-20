---
title: Soil Quality and Site Cleanups
subtitle: Assessing local environment by mapping images related to solid waste, air and water pollution
category:
  - About Awake
author: Daniel Kelly
date: 2019-07-29T17:30:16.858Z
featureImage: /uploads/purge-css-hero.jpg
---

# Site 

Enter site data with each post metadata is described as follows: 

# Soil Quality

Soil quality is assessed by visual, olfactory, effect on water, if burning of trash is done there, types of toxic trash present, nutrient loading, algae, saltation, odor, history

#  Site Cleanup

Mapping data for a site is specifically defined by location lat, location long, location altitude, location title, event description, time, tag, author, group, org, url 






# Caveats

There are some caveats to Purge CSS especially around dynamically created classes. Since these classes aren't fully fleshed out in the .vue files, Purge CSS doesn't know they exist and therefore will strip out their  corresponding css. The fix is pretty simple though, Purge CSS allows us to whitelist classes that should never be purged whether they are found in the html or not. The whitelisting process is described in full in the [Purge CSS docs](https://www.purgecss.com/whitelisting). You can set the `whitelist` option as well as any other purge css option in `config/build.js`.
Sometimes when dev mode and adding markup that uses classes that have not previously been in use, you must restart dev mode for Purge CSS to pick up on the change. 
