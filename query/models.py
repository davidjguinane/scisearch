from django.db import models

# Create your models here.

class Sector(models.Model):
	name = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return self.name

class Center(models.Model):
	name = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return self.name

class Equipment(models.Model):
	name = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return self.name