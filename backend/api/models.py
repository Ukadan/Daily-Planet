from django.db import models

# Create your models here.

class Category(models.Model):
    class Meta:
        verbose_name_plural = 'categories'

    name = models.CharField(max_length=100)
    pass

    def to_json(self):
        return {
            'category_id': self.id,
            'name': self.name
        }

class Author(models.Model):

    class Meta:
        verbose_name_plural = 'authors'

    firstName = models.CharField(max_length=40)
    lastName = models.CharField(max_length=50)
    age = models.IntegerField(default=24)
    pass

    def to_json(self):
        return {
            'id': self.id,
            'first name': self.firstName,
            'last name': self.lastName,
            'age': self.age
        }

class News(models.Model):
    class Meta:
        verbose_name_plural = 'news'

    title = models.CharField(max_length=100)
    image = models.CharField(max_length=300,default='')
    text = models.CharField(max_length=500)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    category = models.ForeignKey(Category,related_name='category_id', on_delete=models.CASCADE, default=1)
    author = models.ForeignKey(Author,related_name='author_id', on_delete=models.CASCADE, default=1)

    def to_json(self):
        return {
            'news_id': self.id,
            'title': self.title,
            'image': self.image,
            'text': self.text,
            'likes': self.likes,
            'dislikes': self.dislikes,
            'category_id': self.category,
            'author_id': self.author
        }

