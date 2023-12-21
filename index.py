import ydb

from tableLOVE_reader import reader
from dbclient import ydb_client
from serialize import to_json_array
from exception import ConnectionFailure

import json

pool = ydb.SessionPool(ydb_client.create_driver())

def bad_request(code: int = 400, body = None):
  return { 
    'statusCode': code,
    'body': body
  }

def usual_responce(result):
  return { 
    'statusCode': 200,
    'body': to_json_array(result[0].rows)
  }

def automobile_get_request(parameters):
  if parameters['data'] == 'automobile_list':
    return usual_responce(pool.retry_operation_sync(reader.serial_numbers_with_models))
  else:
    return bad_request('Incorrect query parameters')

def handler(event, context):
  try:
    if(event['httpMethod'] == 'GET'):
      return automobile_get_request(event['queryStringParameters'])
    else:
      return bad_request()
  except:
    return {
      'statusCode': 500,
      'body': '',
    }
  return {
    'statusCode': 200
  }