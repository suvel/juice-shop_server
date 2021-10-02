# juice-shop_server
This is repo where I will logging my learning of graphql-server.

[Link to the server 🖥](https://juiceshop-graphql.herokuapp.com/graphql)

### Topics:
1. [1st Iteration 🦠](#first_iteration)
2. [Deploying Nodejs app in Heroku 📦](#deploy_nodejs_heroku)

<!----><a name="first_iteration"></a>
## 1st Iteration 🦠:
Installing and using was no big deal, but the declaring schema or even finding documents or tutorials that did not have "apollo" was tough to find.

#### Work Flow:
1. Installed necessary packages:
    1. node
    2. graphql
    3. express
    4. express-graphql
    5. mysql
2. Connected MySQL server
3. [Created "Hollow World"](https://graphql.org/graphql-js/)
4. Add schema and some mocked data to tryout GraphQi (the gui to test and see schema)
5. Replace mocked data with MySQL procedural call.

#### References (docs and troubleshooting):
1. [ER_NOT_SUPPORTED_AUTH_MODE](https://github.com/nodejs/help/issues/1555)
2. [Getting started with GrpahQL](https://graphql.org/graphql-js/)
3. [Handel schema in different file('Constructing Types')](https://graphql.org/graphql-js/constructing-types/)

<!----><a name="deploy_nodejs_heroku"></a>
## Deploying Nodejs app in Heroku 📦:
Had a hard time while dploying the app so adding this info hoping it would help you at some point.

### Steps
1. Make sure you have check these stuff in your code base:
    1. You have the **start script.**
        
        ```jsx
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
           -> "start": "node ./index.js",
            "start_dev": "nodemon ./index.js"
          }
        ```
        
    2. Make the app to listening to the port from **process.env**
        
        ```jsx
        app.listen(process.env.PORT || 4000);
        ```
        
    3. If your using connecting MySQL, make sure the **configuration are correct** and have mention the **correct schema**.
2. Create a Heroku account 
3. Create pipeline with Github repository.
4. Got to "https://dashboard.heroku.com/apps/_your project name_/deploy/github" and select **Setting** tab.
5. **Add buildpack** button after selecting node.js from selector.
6. If you have any  environment variable add in the **Config Vars** section.
    
    Do not use **PORT** as environment variable, as this something which is used my **Heroku.**
    
7. Select the **Deploy** and click on the **Deploy Branch** button.
   
### References
1. [Deploy Node.js app on Heroku from GitHub](https://www.geeksforgeeks.org/how-to-deploy-node-js-app-on-heroku-from-github/)

