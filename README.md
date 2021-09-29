# cloud_project

    Simulator Module:
    {
        ---------------------------------------------
        A: Construct a package with the following:
           - Serial num
           - Items:
                - Size(S,M,L)
                - Item List
           - Price:
                - For all items
                - Tax status
            - Address:
                - Full address
                - District
            - Status:
                - Default status will be Travelling / onRoute
                - Once QRcode was Scanned from FB will update to Arrived
            - Other less relavent data.

        B: Redis:
            - Once qr code was constructed and before it was uploaded to FB:
            - Update redis that the package with <serial num> is on the way
                - Open a connection with our MAIN redis on docker
                - INC via API the 'On Route' Key
            - Perhaps even create a Key with the <serial num> as it's name, and the package data as it's value
            - this way each package will be saved on MAIN redis(not ideal as we have mongo)
            - another solution is to temporarly save the package to redis, and have the MAIN redis module upload it to MONGO

        C: QRcode:
            - Construct a QRcode from all the above data (same file as the above simulator)
            - Upload the QRcode to FireBase
        ---------------------------------------------------------
    Here the simulator Module job's over rest will be a different module
    }
    FIREBASE and DASHBOARD Module
    {
        ----------------------------
        A: Scanning from FB at a random interval any QRcode that is present 
        B: Once QRcode has been scanned, DECR the 'on Route' key and delete from FB
        C: Match the <serial num> scannned from QR to the one in the MAIN redis
            - if MAIN redis constructed the package and uploaded to MONGO: delete the package from MAIN redis
            - Else if the package wasn't constructed, construct it now and upload to MONGO, and then delete the package 
        -----------------------------
        D: Send the data from the scanned QR either via the data inside or via MAIN redis:
            - to the relavent dashboard components that need that data
            - Display the data in dashboard (Mostly done just need cleaning up and adding more)
        ------------------------------
        }
    mongoDB
    {
        A: Will hold in a shipments collection each package in a seperate document:
            - Will either get that data from REDIS after scanning QR or BEFORE scanning
    }

    bigML
    {
        Need alot of research but the general idea is:
        A - Pull data from mongoDB to bigML then:
            - Have a button that once clicked will init the:
                - Construction of models for frequent item sets and other relavent models that we might need
        B - Display:
            - once said button was pressed, and data was constructed we will:
                - Display the data on a seperate page to the Dashboard but also:
            - send the data via MAIN redis to the dashboard module, which will display the 2 latest models constructed
    }
} Thats it.
    


*/
