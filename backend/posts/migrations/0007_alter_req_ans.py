# Generated by Django 5.0.6 on 2024-05-29 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_req_ans'),
    ]

    operations = [
        migrations.AlterField(
            model_name='req',
            name='ans',
            field=models.JSONField(),
        ),
    ]