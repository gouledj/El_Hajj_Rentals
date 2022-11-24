# Generated by Django 4.1.1 on 2022-11-23 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('branchID', models.AutoField(primary_key=True, serialize=False)),
                ('branchPhone', models.CharField(max_length=100)),
                ('province', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('postalCode', models.CharField(max_length=100)),
                ('streetNumber', models.IntegerField()),
                ('streetName', models.CharField(max_length=100)),
                ('unitNumber', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('carID', models.AutoField(primary_key=True, serialize=False)),
                ('manufacturer', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('fuelType', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=100)),
                ('licensePlate', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('mileage', models.IntegerField()),
                ('typeID', models.IntegerField()),
                ('branchID', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CarType',
            fields=[
                ('typeID', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=100)),
                ('dailyCost', models.FloatField()),
                ('weeklyCost', models.FloatField()),
                ('monthlyCost', models.FloatField()),
                ('lateFee', models.FloatField()),
                ('changeBranchFee', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customerID', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('driversLicense', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(default='', max_length=15)),
                ('salt', models.CharField(default='', max_length=15)),
                ('customerPhone', models.CharField(max_length=100)),
                ('dob', models.DateField()),
                ('goldMember', models.BooleanField()),
                ('province', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('postalCode', models.CharField(max_length=100)),
                ('streetNumber', models.IntegerField()),
                ('streetName', models.CharField(max_length=100)),
                ('unitNumber', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employeeID', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('employeePhone', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('salt', models.CharField(max_length=100)),
                ('salary', models.FloatField()),
                ('dob', models.DateField()),
                ('goldMember', models.BooleanField()),
                ('province', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('postalCode', models.CharField(max_length=100)),
                ('streetNumber', models.IntegerField()),
                ('streetName', models.CharField(max_length=100)),
                ('unitNumber', models.IntegerField()),
                ('branchID', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Rental',
            fields=[
                ('rentalID', models.AutoField(primary_key=True, serialize=False)),
                ('dateFrom', models.DateField()),
                ('dateTo', models.DateField()),
                ('dateReturned', models.DateField()),
                ('totalCost', models.FloatField()),
                ('licensePlate', models.CharField(max_length=100)),
                ('goldMember', models.BooleanField()),
                ('branchID', models.IntegerField()),
                ('carID', models.IntegerField()),
                ('typeID', models.IntegerField()),
            ],
        ),
    ]
