from bson.objectid import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .db import tasks_collection


@api_view(['GET'])
def get_tasks(request):
    tasks = []
    for task in tasks_collection.find():
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return Response(tasks)


@api_view(['POST'])
def add_task(request):
    data = request.data
    result = tasks_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return Response({
        "message": "Task added successfully",
        "task": data
    })


@api_view(['PUT'])
def update_task(request, id):
    data = request.data
    result = tasks_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )

    if result.matched_count == 0:
        return Response({"message": "Task not found"}, status=404)

    task = tasks_collection.find_one({"_id": ObjectId(id)})
    task["_id"] = str(task["_id"])

    return Response({
        "message": "Task updated successfully",
        "task": task
    })


@api_view(['DELETE'])
def delete_task(request, id):
    result = tasks_collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count == 0:
        return Response({"message": "Task not found"}, status=404)

    return Response({
        "message": "Task deleted successfully"
    })