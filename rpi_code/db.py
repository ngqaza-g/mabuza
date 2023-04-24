import sqlite3

class DB:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        try:
            self.create_table()
            print("fingerprints table created")
        except sqlite3.OperationalError as e :
            print(e)
    
    def create_table(self,):
        with self.conn:
            self.cursor.execute("""
                CREATE TABLE fingerprints (
                    driver_id text,
                    fingerprint_id integer
                )
            """)

    def add_fingerprint(self, driver_id, fingerprint_id):
        with self.conn:
            self.cursor.execute("INSERT INTO fingerprints VALUES (:driver_id, :fingerprint_id)", {"driver_id": driver_id, "fingerprint_id": fingerprint_id})
            

    

    def get_driver_id(self, fingerprint_id):
        with self.conn:
            self.cursor.execute("SELECT driver_id FROM fingerprints WHERE fingerprint_id=:fingerprint_id", {"fingerprint_id": fingerprint_id})
            data = self.cursor.fetchone()
            if(data):
                return data[0]
            return False
    
    def close(self,):
        self.conn.close()
