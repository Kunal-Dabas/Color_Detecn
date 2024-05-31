from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
from django.contrib.postgres.validators import MinValueValidator

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    # ans = ArrayField( ArrayField(models.IntegerField() , size= 10 , null= True , blank= True) )
    venue_img = models.ImageField( null = True , blank = True , upload_to="images/")
    def __str__(self) :
        return f"Post:{self.venue_img}"

class Req( models.Model):
    # ans = ArrayField( ArrayField(models.IntegerField(validators=[MinValueValidator(0)])))
    ans = JSONField()
    def __str__(self) :
        return f"Posts;{self.ans}"


# input_data = {
#   "n1": ["0123", "4567", "8901"],
#   "n2": ["1234", "5678", "9012"],
#   "n3": ["2345", "6789", "0123"]
# }

# # Create an instance of MyModel with the input data
# instance = Req(ans=input_data)
# instance.save()