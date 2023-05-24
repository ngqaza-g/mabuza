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
                    name text,
                    username text,
                    fingerprint_id integer,
                    phone_number text
                )
            """)

    def add_fingerprint(self, name, username, driver_id, fingerprint_id, phone_number):
        with self.conn:
            self.cursor.execute("INSERT INTO fingerprints VALUES (:driver_id, :name, :username :fingerprint_id, :phone_number)", {"driver_id": driver_id, "fingerprint_id": fingerprint_id, "phone_number": phone_number, "name": name, "username": username})
            

    

    def get_driver_id(self, fingerprint_id):
        with self.conn:
            self.cursor.execute("SELECT driver_id FROM fingerprints WHERE fingerprint_id=:fingerprint_id", {"fingerprint_id": fingerprint_id})
            data = self.cursor.fetchone()
            if(data):
                return data[0]
            return False

    def get_phone_numbers(self,):
        with self.conn:
            self.cursor.execute("SELECT phone_number from fingerprints")
            data = self.cursor.fetchall()
            if(data):
                return data
            return False
            
    def get_driver(self, driver_id):
        with self.conn:
            self.cursor.execute("SELECT name, username from fingerprints WHERE driver_id = :driver_id", {"driver_id" : driver_id})
            data = self.cursor.fetchone()
            if(data):
                return data[0]
            return False

    
    def close(self,):
        self.conn.close()
