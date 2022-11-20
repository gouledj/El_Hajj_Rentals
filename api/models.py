from django.db import models

# Create your models here.


class Rental(models.Model):
    rentalID = models.AutoField(primary_key=True)
    dateFrom = models.DateField()
    dateTo = models.DateField()
    dateReturned = models.DateField()
    totalCost = models.FloatField()
    licensePlate = models.CharField(max_length=100)
    goldMember = models.BooleanField()
    customerID = models.IntegerField
    branchID = models.IntegerField()
    carID = models.IntegerField()
    typeID = models.IntegerField()


class Customer(models.Model):
    customerID = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    driversLicense = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=15, default='')
    salt = models.CharField(max_length=15, default='')
    customerPhone = models.CharField(max_length=100)
    dob = models.DateField()
    goldMember = models.BooleanField()
    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=100)
    streetNumber = models.IntegerField()
    streetName = models.CharField(max_length=100)
    unitNumber = models.IntegerField()


class Employee(models.Model):
    employeeID = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    employeePhone = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    salt = models.CharField(max_length=100)
    salary = models.FloatField()
    dob = models.DateField()
    goldMember = models.BooleanField()
    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=100)
    streetNumber = models.IntegerField()
    streetName = models.CharField(max_length=100)
    unitNumber = models.IntegerField()
    branchID = models.IntegerField()


class Car(models.Model):
    carID = models.AutoField(primary_key=True)
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    fuelType = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    licensePlate = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    mileage = models.IntegerField()
    typeID = models.IntegerField()
    branchID = models.IntegerField()



class CarType(models.Model):
    typeID = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100)
    dailyCost = models.FloatField()
    weeklyCost = models.FloatField()
    monthlyCost = models.FloatField()
    lateFee = models.FloatField()
    changeBranchFee = models.FloatField()


class Branch(models.Model):
    branchID = models.AutoField(primary_key=True)
    branchPhone = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=100)
    streetNumber = models.IntegerField()
    streetName = models.CharField(max_length=100)
    unitNumber = models.IntegerField()
