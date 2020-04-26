from rest_framework import serializers

from api.models import Category, Author, News

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data.get('name'))
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'image', 'text', 'likes', 'dislikes', 'category_id', 'author_id',)

class AuthorSerializer(serializers.Serializer):
    class Meta:
        model = Author
        fields = ('id', 'firstName', 'lastName', 'age')
