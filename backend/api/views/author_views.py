from django.shortcuts import render
import json
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Author
from api.serializers import AuthorSerializer


# Create your views here.

@api_view(['GET', 'POST'])
def author_list(request):
    if request.method == 'GET':
        categories = Author.objects.all()
        serializer = AuthorSerializer(categories, many=True)

        return Response(serializer.data)
    # return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        request_body = json.loads(request.body)

        serializer = AuthorSerializer(data=request_body)
        if serializer.is_valid():  # Validating data from clients
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def author_detail(request, author_id):
    try:
        category = Author.objects.get(id=author_id)
    except Author.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = AuthorSerializer(category)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':

        request_body = json.loads(request.body)

        serializer = AuthorSerializer(instance=category, data=request_body)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data)

        return JsonResponse({'error': serializer.errors})

        # Delete selected object

    elif request.method == 'DELETE':

        category.delete()

        return JsonResponse({'deleted': True})
