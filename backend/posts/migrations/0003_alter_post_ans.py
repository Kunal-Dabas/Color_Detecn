# Generated by Django 5.0.6 on 2024-05-28 14:56

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_venue_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='ans',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=10), size=None),
        ),
    ]
