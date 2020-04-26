from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Category, News
from api.serializers import CategorySerializer, NewsSerializer


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryDetailAPIView(APIView):
    def get_object(self, category_id):
        try:
            return Category.objects.get(id=category_id)
        except Category.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, category_id):
        category= self.get_object(category_id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, company_id):
        category = self.get_object(company_id)
        serializer = CategorySerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.data})

    def delete(self, request, category_id):
        category = self.get_object(category_id)
        category.delete()

        return Response({'deleted': True})


class NewsByCategoryIdAPIView(APIView):
    def get(self, request, category_id):
        news = News.objects.filter(category=category_id)
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)


class NewsListAPIView(APIView):
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NewsDetailsAPIView(APIView):
    def get_object(self, news_id):
        try:
            return News.objects.get(id=news_id)
        except News.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, news_id):
        news = self.get_object(news_id)
        serializer = NewsSerializer(news)
        return Response(serializer.data)

    def put(self, request, news_id):
        news = self.get_object(news_id)
        serializer = NewsSerializer(instance=news, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors })

    def delete(self, request, news_id):
        category = self.get_object(news_id)
        category.delete()

        return Response({'deleted':True})

