# Generated by Django 5.0.6 on 2024-05-29 11:22

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_remove_post_ans'),
    ]

    operations = [
        migrations.CreateModel(
            name='Req',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ans', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=10), size=None)),
            ],
        ),
    ]
