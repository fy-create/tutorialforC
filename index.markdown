---
layout: default
title: Home
---

<link rel="stylesheet" href="{{ '/assets/custom.css' | relative_url }}">

<div class="container">
    <!-- 左边：C语言文章 -->
    <div>
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
    <div>
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
    <div>
        <h2>嵌入式开发</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'embed' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>

    <div >
        <h2>C++</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'C++' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
    <div>
        <h2>Java</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'Java' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
    <div>
        <h2>设计模式</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'Pattern' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
    <div>
        <h2>GPT</h2>
        <ul>
            {% for post in site.posts reversed %}
                {% if post.categories contains 'gpt' %}
                    <li>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
</div>


---  

小游戏


[计算24]({{ site.baseurl }}/games/calc24)
[解交叉]({{ site.baseurl }}/games/crossline)
[魔方]({{ site.baseurl }}/games/cube)
[除法]({{ site.baseurl }}/games/division)
[数独]({{ site.baseurl }}/games/sudoku)
[三视图]({{ site.baseurl }}/games/threeview)





