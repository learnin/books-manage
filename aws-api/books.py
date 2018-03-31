import decimal
import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')

def create(event, context):
    data = json.loads(event['body'])
    if 'isbn' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the book item.")

    timestamp = int(time.time() * 1000)

    books = dynamodb.Table(os.environ['DYNAMODB_TABLE_BOOKS'])

    item = {
        'BookId': str(uuid.uuid1()),
        'Isbn': data['isbn'],
        'Name': data['name'],
        'Author': data['author'],
        'createDateTime': timestamp
    }

    books.put_item(Item=item)

    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(item)
    }

    return response

def list(event, context):
    books = dynamodb.Table(os.environ['DYNAMODB_TABLE_BOOKS'])

    result = books.scan()

    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(result['Items'], cls=DecimalEncoder)
    }

    return response

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)
