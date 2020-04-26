from django.urls import path

from api.views.views import category_list, category_detail
from api.views.author_views import author_detail, author_list
from api.views.news_views import *
urlpatterns = [
    path('categories/', category_list),
    path('categories/<int:category_id>/', category_detail),
    path('authors/', author_list),
    path('authors/<int:author_id>/', author_detail),

    # cbv
    # path('categories/', CategoryListAPIView.as_view()),
    # path('categories/<int:category_id>/', CategoryDetailAPIView.as_view()),
    path('categories/<int:category_id>/news/', NewsByCategoryIdAPIView.as_view()),
    path('news/', NewsListAPIView.as_view()),
    path('news/<int:news_id>/', NewsDetailsAPIView.as_view()),
]

