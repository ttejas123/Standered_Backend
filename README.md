# internshipAssignmentBackendCURD
Start Project by <br />
 <b> npm start </b>
 
 # It Contain CURD opration
 -------------------------------CREATE---------------------------------------<br/>
 1. <b>Create One</b><br />
 APi URL and type<br />
 {"url": /insert, "type": "post"}<br /><br />
 Input format in body<br />
 {
    "name": "Yoga Plan",
    "img": "http://wenf",
    "summary": "fwejie"
 } 
 </br></br>
 
 2. Create Many <br />
 APi URL and type<br />
 {"url": /insertMany, "type": "post"}<br /><br />
 Input format in body<br />
{ 
    "insertMany": [{
      "name": "Yoga Plan",
    "img": "http://wenf",
    "summary": "fwejie"
    }, {
      "name": "Yoga Plan",
    "img": "http://wenf",
    "summary": "fwejie"
    }]
}
 </br></br>
 
 -------------------------------READ---------------------------------------<br/>
  3. read <br />
 APi URL and type<br />
 {"url": /read, "type": "get"}<br /><br />
 Input format in body<br />
 none if you don't want to search for name <br/>
 for searching input format <br/>
 {"find": "content for searching"}
 </br></br>
 
 
 4. read One <br />
 APi URL and type<br />
 {"url": /:id, "type": "get"}<br /><br />
 Input format in body<br />
 none 
 </br></br>
 
 -------------------------------DELETE---------------------------------------<br/>
 5. delete one <br />
 APi URL and type<br />
 {"url": /delete/:id, "type": "post"}<br /><br />
 Input format in body<br />
 none just pass id in url
 </br></br>
 
 6. Delete Many <br />
 APi URL and type<br />
 {"url": /deleteManyById, "type": "post"}<br /><br />
 Input format in body<br />
 {"deleteManyById": [id, id, id, id, ...]}
 </br></br>
 
 -------------------------------UPDATE---------------------------------------<br/>
  7. <b>Create One</b><br />
 APi URL and type<br />
 {"url": /update/:id, "type": "post"}<br /><br />
 Input format in body<br />
 {
    "name": "Yoga Plan",
    "img": "http://wenf",
    "summary": "fwejie"
 } 
 </br></br>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
