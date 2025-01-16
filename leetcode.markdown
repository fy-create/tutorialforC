---
layout: page
---

<div>
    <h2>LeetCode算法</h2>
    <ul class="arithmetic-list multi-column">
        {% for post in site.posts reversed %}
            {% if post.categories contains 'arithmetic' %}
                <li>
                    <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
                </li>
            {% endif %}
        {% endfor %}
    </ul>
</div>
