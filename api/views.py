from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import RentalSerializer, CustomerSerializer, EmployeeSerializer, CarSerializer, CarTypeSerializer, BranchSerializer
from .models import Rental, Customer, Employee, Car, CarType, Branch


# Create your views here.

class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()


class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()


@api_view(['GET', 'POST'])
def branches_list(request):
    if request.method == 'GET':
        data = Branch.objects.all()

        serializer = BranchSerializer(
            data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def branches_detail(request, branchID):
    try:
        branch = Branch.objects.get(branchID=branchID)
    except Branch.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = BranchSerializer(
            branch, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
