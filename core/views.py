
from django.shortcuts import render
from django.http import JsonResponse
# 3rd party
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import sqlite3
# Create your views here.
class TestView(APIView):
	def get(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		# cursor.execute("SELECT * FROM users WHERE id=?", (request.data['id'],))
		if request.data and "email" in request.data:
			cursor.execute("SELECT * FROM auth_user WHERE email=?", (request.data["email"],))
			results = cursor.fetchall()
		else:
			cursor.execute("SELECT * FROM auth_user")
			results = cursor.fetchall()
		data = []
		# if request.data['id']
		for row in results:
			print(row[0])
			data.append({
				"id":row[0],
				"username":row[4],
				"last_name":row[5],
				"email":row[6],
			})
		cursor.close()
		# for key in request.data:
		# 	print(key)

		# for a in serializer.data:
		# 	if int((a)['id']) == int(request.data['id']):
		# 		data.append(a)
		return Response(data)

		# if 'username' in request.data:
		# 	cursor.execute("SELECT * FROM auth_user WHERE username=?", (request.data['username'],))
		# else:
		# cursor.execute("SELECT * FROM auth_user")
		# results = cursor.fetchall()
		# print(results)
		# data = []
		# # if request.data['id']
		# for row in results:
		# 	object1 = {}
		# 	col_name_list = [tuple[0] for tuple in cursor.description]
		# 	for x in range(0,len(col_name_list) ):
		# 		object1[col_name_list[x]] = row[x]
		# 	data.append(object1)
		# cursor.close()
		# for key in request.data:
		# 		print(key)

		# # for a in serializer.data:
		# 	if int((a)['id']) == int(request.data['id']):
		# 		data.append(a)
		# return Response(data)
class RecipesView(APIView):
	def get(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		print(kwargs)
		if kwargs and "user_id" in kwargs:
			cursor.execute("SELECT * FROM saved_recipes WHERE user_id=?", (kwargs["user_id"],))
			results = cursor.fetchall()
		else:
			cursor.execute("SELECT * FROM saved_recipes")
			results = cursor.fetchall()
		data = []
		for row in results:
			print(row[0])
			data.append(row)
		cursor.close()
		return Response(data)
	def post(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		cursor.execute('INSERT INTO saved_recipes (image,name,user_id) VALUES (?,?,?) ;',(request.data["image"],request.data["name"],request.data["user_id"]))
		print(request.data)
		connection.commit()
		# serializer =PostSerializer(data = request.data )
		# if serializer.is_valid():
		# 	serializer.save()
		return Response(request.data)
	def put(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		print(kwargs['id'])
		for key in request.data:
				cursor.execute(f"UPDATE saved_recipes SET {key} = ? WHERE id = ?;",(request.data[key],kwargs['id']) )
		connection.commit()
		return Response(request.data)
	def delete(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		print(kwargs['id'])
		cursor.execute("DELETE FROM saved_recipes WHERE id = ?;",(kwargs['id']) )
		connection.commit()
		return Response(request.data)
class IngredientsView(APIView):
	def get(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		print(kwargs)
		if kwargs and "user_id" in kwargs:
			cursor.execute("SELECT * FROM saved_ingredients WHERE user_id=?", (kwargs["user_id"],))
			results = cursor.fetchall()
		else:
			cursor.execute("SELECT * FROM saved_ingredients")
			results = cursor.fetchall()
		data = []
		for row in results:
			print(row[0])
			data.append({
				"id":row[3],
				"name":row[1],
				"image":row[2],
				"user_id":row[0],
			})
		cursor.close()
		return Response(data)
	def post(self,request,*args,**kwargs):
		connection = sqlite3.connect('/Users/lambda_school_loaner_182/Documents/Food-Search/db.sqlite3')
		cursor = connection.cursor()
		cursor.execute('INSERT INTO saved_ingredients (image,name,user_id) VALUES (?,?,?) ;',(request.data["image"],request.data["name"],request.data["user_id"]))
		print(request.data)
		connection.commit()
		# serializer =PostSerializer(data = request.data )
		# if serializer.is_valid():
		# 	serializer.save()
		return Response(request.data)

		