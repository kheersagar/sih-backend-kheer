const ticketTemplate = (data) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <style>
  .col-6{
    width:50%;

  }
      .div-1-2
      {
          padding: 0.2rem;
      }
      .div-1-3
      {
          display: flex;
          justify-content: space-evenly;
          margin: 2rem 0 
      }
      .img-moc1
      {
          width: 105px; height: 105px; 
          border-radius: 0;
      }
      .div-1-4
      {
          text-align: center;
          margin: 1rem 0 2rem 0;
      }
      .div-1-5
      {
          font-weight: 600;
          font-size: 1.5rem;
      }
      .div-1-6
      {
          font-size: 1rem;
          font-weight: 600;
          
      }
      .div-1-7
      {
          display: flex;
      }
      .div-1-8
      {
          flex: 3;
      }
      .div-1-9
      {
          text-align: center;
          font-weight: 600;
          margin: 0 0 2rem 0;
      }
      .div-1-10
      {
          display: flex;
          margin: 4rem 0;
      }
      .div-1-11
      {
          display: flex;
          flex-direction:row;
          margin: 0.2rem 0;
      }
      .div-1-12
      {
          font-weight: 600;
      }
      .div-1-13{
          flex: 1;
      }
      .div-1-14
      {
          width: 200px;
      }
      .div-1-15
      {
          margin: 0 0 0 1rem;
          border-radius: 0;
          
      }
      
  </style>
  <body>
      <div
        class="div-1"
      >
        <div class="div-1-2">
          <div
            class="div-1-3"
            
          >
            <div >
              <img
                src="http://localhost:8000/download.png"
                alt=".."
                class="img-moc1"
                
              />
            </div>
            <div >
              <img
                src="http://localhost:8000/download.jpg"
                alt=".."
                class="img-moc1"
              />
            </div>
          </div>
          <div
            class="div-1-4"
            
          >
            <div class="div-1-5">
              E-Ticket for ${data?.monumentId.name}
            </div>
            <div class="div-1-6">
              Ticket is valid for one person and one time use only
            </div>
          </div>
          <div class="div-1-7">
            <div class="div-1-8">
              <h4
               class="div-1-9"
              >
                Ticket Details
              </h4>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">Ticket Type</h5>
                </div>
                <div class="col-6">
                  <h5>Adult</h5>
                </div>
              </div>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">Visitor Type</h5>
                </div>
                <div class="col-6">
                  <h5>Indian</h5>
                </div>
              </div>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">Ticket Number</h5>
                </div>
                <div class="col-6">
                  <h5>1234567898</h5>
                </div>
              </div>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">ASI Fee</h5>
                </div>
                <div class="col-6">
                  <h5>Rs 50</h5>
                </div>
              </div>
              <h4
                class="div-1-9"
              >
                Validity
              </h4>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">Date</h5>
                </div>
                <div class="col-6">
                  <h5>2022-08-08</h5>
                </div>
              </div>
              <div class="div-1-11">
                <div class="col-6">
                  <h5 class="div-1-12">Time</h5>
                </div>
                <div class="col-6">
                  <h5>6:am-12:00pm</h5>
                </div>
              </div>
  
              <h4
                class="div-1-9"
              >
                Visitor's Detail
              </h4>
              <div style="page-break-inside: avoid">
              
              ${data?.ticketedUsers.map((item) => {
                return `<div class="div-1-7">
                      <div class="col-6">
                        <h5 class="div-1-12">Name</h5>
                      </div>
                      <div class="col-6">
                        <h5>${item.name}</h5>
                      </div>
                    </div>
                    <div class="div-1-11">
                      <div class="col-6">
                        <h5 class="div-1-12">Age</h5>
                      </div>
                      <div class="col-6">
                        <h5>${item.age}</h5>
                      </div>
                    </div>
                    <div class="div-1-11">
                      <div class="col-6">
                        <h5 class="div-1-12">Identity Type</h5>
                      </div>
                      <div class="col-6">
                        <h5>${item.idType}</h5>
                      </div>
                    </div>
                    <div class="div-1-11">
                      <div class="col-6">
                        <h5 class="div-1-12">Identity No</h5>
                      </div>
                      <div class="col-6">
                        <h5>${item.idNumber}</h5>
                      </div>
                    </div>`;
              })}
              </div>
            </div>
            <div class="div-1-13">
              <img src=${data?.qr} class="div-1-14" />
            </div>
          </div>
          <div class="div-1-10" style="page-break-after:always;" >
            <div>
              <h3
                class="div-1-9"
              >
                Important Information
              </h3>
              <ol>
                <li>The e-ticket is not transferable</li>
                <li>Entry Fee is not refundable</li>
                <li>E-Ticket cancellations are not permitted</li>
                <li>
                  The Monument is open for visitors between sunrise and sunset
                </li>
                <li>Visitor shall be required to show photo identity proof</li>
                <li>Edibles are not allowed inside the Monument</li>
                <li>Inflammable/dangerous/explosive articles are not allowed</li>
                <li>
                  The entry to the monument will be closed 30 minutes prior to the
                  closing time of the monument
                </li>
                <li>
                  Ticket is valid only for 3 hourse from the time of the entry
                </li>
              </ol>
            </div>
            <div>
              <img
                src="http://localhost:8000/ind-day.jpg"
                class="div-1-15"
              ></img>
            </div>
          </div>
        </div>
      </div>
  </body>
  </html>`;
};

module.exports = ticketTemplate;
