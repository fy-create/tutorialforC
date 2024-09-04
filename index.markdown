---
layout: default
title: Home
---

<ul>
  {% for post in site.posts reversed %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <!--
      <p>Published on {{ post.date | date: "%B %d, %Y" }}</p>
      -->
    </li>
  {% endfor %}
</ul>