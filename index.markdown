---
layout: default
title: Home
---

<link rel="stylesheet" href="{{ '/assets/custom.css' | relative_url }}">

<div class="container">
    <!-- 左边：C语言文章 -->
    <div class="left-column">
        <h2>C语言</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'c_language' %}
                    <li>
                        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>

    <!-- 右边：数据结构文章 -->
    <div class="right-column">
        <h2>数据结构</h2>
        <ul>
            {% for post in site.posts %}
                {% if post.categories contains 'data_structure' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
</div>
