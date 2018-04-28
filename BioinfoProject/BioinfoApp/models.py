from django.db import models

# Create your models here.
class Percorso(models.Model):                    # model - class    - table
    percorso = models.CharField(max_length=50255)  # field - instance - row
