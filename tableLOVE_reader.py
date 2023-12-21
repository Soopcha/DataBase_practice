import ydb

def blocking_query(session, query):
  return session.transaction().execute(
    query,
    commit_tx = True,
    settings = ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
  )

class TableLOVE_reader:
    def serial_numbers_with_models(self, session):
      query = '''SELECT vr.id as VRid, vr.EXPERIENCE as exp, coalesce(patient.Name, 'Unknown') as patient, 
    FROM Vrach vr LEFT JOIN patient patient ON vr.id = patient.vrachid;'''
      return blocking_query(session, query)
        
reader = TableLOVE_reader()