var kt=Object.defineProperty;var b=(e,n)=>()=>(e&&(n=e(e=0)),n);var w=(e,n)=>{for(var t in n)kt(e,t,{get:n[t],enumerable:!0})};var G={};w(G,{default:()=>St});import{html as jt}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";async function St({weight:e=1}){let n="q-fastapi-proxy",t="Write a FastAPI proxy server",o=async c=>{if(!c)throw new Error("URL is required");let s=String(Math.floor(Math.random()*1e5)),i=new URLSearchParams({url:`https://httpbin.org/get?x=${s}`});if((await fetch(c+"?"+i.toString()).then(u=>u.json()))?.args?.x!==s)throw new Error("Incorrect response");return!0},a=jt`
    <div class="mb-3">
      <p>
        Write a FastAPI proxy server that serves the data from the given URL but also adds a CORS header
        <code>Access-Control-Allow-Origin: *</code> to the response.
      </p>
      <p>
        For example, if your API URL endpoint is <code>http://127.0.0.1:8000/api</code>, then a request to
        <code>http://127.0.0.1:8000/api?url=https%3A%2F%2Fexample.com%2F%3Fkey%3Dvalue</code> should return the data
        from <code>https://example.com/?key=value</code> but with the CORS header.
      </p>
      <p><strong>Note:</strong> Keep your server running for the duration of the exam.</p>
      <label for="${n}" class="form-label"> What is your FastAPI Proxy URL endpoint? </label>
      <input class="form-control" id="${n}" name="${n}" type="url" required />
      <p class="text-muted">
        We'll check by sending a request to this URL with <code>?url=...</code> check if the response matches the data.
      </p>
    </div>
  `;return{id:n,title:t,weight:e,question:a,answer:o}}var Q=b(()=>{});async function $(e){let t=new TextEncoder().encode(e),o=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}var E=b(()=>{});var Y={};w(Y,{default:()=>Et});import{html as Ct}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as qt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";async function Et({user:e,weight:n=1}){let t="q-stackoverflow-common-tags",o="Find common tags on StackOverflow",a=["javascript","python","java","c#","php","android","html","jquery","c++","css","ios","sql","mysql","r","reactjs","node.js","arrays","c","asp.net","json",".net","ruby-on-rails","sql-server","swift","django","angular","objective-c","excel","pandas","angularjs","regex","typescript","ruby","linux","ajax","iphone","vba","xml","laravel","spring","asp.net-mvc","database","wordpress","string","flutter","postgresql","mongodb","wpf","windows","amazon-web-services"],c=qt(`${e.email}#${t}`),[s,i]=a.sort(()=>c()-.5).slice(0,2),h=p=>`https://api.stackexchange.com/2.3/tags/${p}/related?site=stackoverflow&pagesize=20`,u=await fetch(h(s)).then(p=>p.json()),g=await fetch(h(i)).then(p=>p.json()),m={};for(let p of u.items)m[p.name]=(m[p.name]||0)+p.count;for(let p of g.items)m[p.name]=(m[p.name]||0)+p.count;let f=Object.entries(m).sort((p,j)=>j[1]-p[1]).find(([p])=>![s,i].includes(p))[0],r=await $(f),l=async p=>{if(await $(p.trim())!==r)throw new Error("Incorrect tag");return!0},y=Ct`
    <div class="mb-3">
      <p>
        The <a href="https://api.stackexchange.com/">StackOverflow API</a> lets you find all tags related to a given
        tag. Associated with each tag is a common question count -- the number of questions tagged with that tag
        <em>and</em> your tag.
      </p>
      <p>
        Find the tag that whose common question count with tag <code>${s}</code> + common question count with tag
        <code>${i}</code> is the highest.
      </p>
      <label for="${t}" class="form-label">
        Which tag is associated most with <code>${s}</code> and <code>${i}</code>?
      </label>
      <input class="form-control" id="${t}" name="${t}" required />
      <p class="text-muted">
        Find the tags related to <code>${s}</code> and to <code>${i}</code>. Add the counts and enter largest tag.
      </p>
    </div>
  `;return{id:t,title:o,weight:n,question:y,answer:l}}var K=b(()=>{E()});var V,X=b(()=>{V=(e,n,t)=>{let o=Array.from({length:e},(c,s)=>({studentId:s+1,class:`${Math.floor(t()*12)+1}${String.fromCharCode(65+Math.floor(t()*26))}`})),a=o.flatMap(c=>Array.from({length:Math.floor(t()*n)+1},(s,i)=>({studentId:c.studentId,subject:`Subject #${i+1}`})));return{students:o,subjects:a}}});function k(e,n){let t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download=n,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t)}var P=b(()=>{});var Z={};w(Z,{default:()=>Ot});import{html as Pt}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as Tt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";import Dt from"https://cdn.jsdelivr.net/npm/jszip@3/+esm";import{groupBy as It}from"https://cdn.jsdelivr.net/npm/lodash-es@4/+esm";async function Ot({user:e,weight:n=1}){let t="q-least-unique-subjects-from-csv",o="Least unique subjects from CSV",a=Tt(`${e.email}#${t}`),{students:c,subjects:s}=V(2e3,400,a),i=new Dt;i.file("students.csv",`studentId,class
`+c.map(r=>`${r.studentId},${r.class}`).join(`
`)),i.file("subjects.csv",`studentId,subject
`+s.map(r=>`${r.studentId},${r.subject}`).join(`
`));let h=await i.generateAsync({type:"blob"}),u=Pt`
    <p>
      Download and unzip
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${()=>k(h,`${t}.zip`)}>
        ${t}.zip</button
      >. It has 2 files:
    </p>
    <ol>
      <li>
        <code>students.csv</code> has 2 columns:
        <ol>
          <li>studentId: A unique identifier for each student</li>
          <li>class: The class (including section) of the student</li>
        </ol>
      </li>
      <li>
        <code>subjects.csv</code> has 2 columns:
        <ol>
          <li>studentId: The identifier for each student</li>
          <li>subject: The name of the subject they have chosen</li>
        </ol>
      </li>
    </ol>
    <div class="mb-3">
      <label for="${t}" class="form-label"
        >What are the least number of subjects any class has taken up? List the 3 lowest count of subjects in
        order.</label
      >
      <input class="form-control" id="${t}" name="${t}" />
      <p class="text-muted">
        Find the number of <em>unique</em> subjects in each class. Then calculate the minimum of those. Sort in
        ascending order. List the first 3 values separated by commas, without spaces (e.g. <code>45,45,48</code>)
      </p>
    </div>
  `,g=Object.fromEntries(c.map(r=>[r.studentId,r.class])),m=It(s,r=>g[r.studentId]),f=Object.entries(m).map(([,r])=>new Set(r.map(l=>l.subject)).size).sort((r,l)=>r-l).slice(0,3).join(",");return{id:t,title:o,weight:n,question:u,answer:f}}var _=b(()=>{X();P()});var R,tt=b(()=>{R=(e,n)=>e[Math.floor(n()*e.length)]});var et={};w(et,{default:()=>Ft});import{html as Bt}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as Lt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";function Wt(e,n){return window[n]?window[n]:new Promise((t,o)=>{let a=document.createElement("script");a.src=e,a.onload=()=>t(window[n]),a.onerror=()=>o(new Error(`Failed to load script: ${e}`)),document.head.appendChild(a)})}async function Ft({user:e,weight:n=1}){let t="q-extract-tables-from-pdf",o="Extract tables from PDF",a=Lt(`${e.email}#${t}`),[c,s]=[100,30],[i,h,u,g,m]=[100,20,100,50,5],d=["Maths","Physics","English","Economics","Biology"],f=Array.from({length:c},()=>Array.from({length:s},()=>d.map(()=>Math.floor(a()*90)+10))),r=await Wt("https://cdn.jsdelivr.net/npm/pdfkit@0.16.0/js/pdfkit.standalone.js","PDFDocument"),l=new r({margin:50}),y=[];l.on("data",y.push.bind(y)),Array.from({length:c}).forEach((x,S)=>{S>0&&l.addPage(),l.text(`Student marks - Group ${S+1}`,{align:"center",underline:!0}),d.forEach((F,M)=>{let C=g+M*u;l.rect(C,i,u,h).stroke(),l.text(F,C+m,i+m)}),f[S].forEach((F,M)=>{let C=i+(M+1)*h;F.forEach((vt,xt)=>{let U=g+xt*u;l.rect(U,C,u,h).stroke(),l.text(vt,U+m,C+m)})})});let p=new Promise(x=>{l.on("end",()=>{x(new Blob(y,{type:"application/pdf"}))})});l.end();let j=await p,v=Math.max(1,Math.floor(a()*c-20)),T=Math.min(c,v+Math.floor(a()*20)+20),W=R(d,a),D=R(d,a),I=Math.floor(a()*70)+10,bt=d.indexOf(W),yt=d.indexOf(D),wt=f.slice(v-1,T).flat().filter(x=>x[yt]>=I).map(x=>x[bt]).reduce((x,S)=>x+S,0),$t=Bt`
    <div class="mb-3">
      <h2>Academic Performance Analysis for EduAnalytics</h2>
      <p>
        <strong>EduAnalytics Corp.</strong> is a leading educational technology company that partners with schools and
        educational institutions to provide data-driven insights into student performance. By leveraging advanced
        analytics and reporting tools, EduAnalytics helps educators identify trends, improve teaching strategies, and
        enhance overall student outcomes. One of their key offerings is the
        <strong>Performance Insight Dashboard</strong>, which aggregates and analyzes student marks across various
        subjects and demographic groups.
      </p>
      <p>
        EduAnalytics has recently onboarded <strong>Greenwood High School</strong>, a large educational institution
        aiming to optimize its teaching methods and improve student performance in core subjects. Greenwood High School
        conducts annual assessments in multiple subjects, and the results are compiled into detailed PDF reports each
        semester. However, manually extracting and analyzing this data is time-consuming and prone to errors, especially
        given the volume of data and the need for timely insights.
      </p>
      <p>
        To address this, EduAnalytics plans to automate the data extraction and analysis process, enabling Greenwood
        High School to receive precise and actionable reports without the delays associated with manual processing.
      </p>
      <p>
        As part of this initiative, you are a data analyst at EduAnalytics assigned to develop a module that processes
        PDF reports containing student marks. Each PDF, named in the format <code>xxx.pdf</code>, includes a
        comprehensive table listing student performances across various subjects, along with their respective groups.
      </p>
      <p><strong>Greenwood High School</strong> has specific analytical needs, such as:</p>
      <ul>
        <li>
          <strong>Subject Performance Analysis:</strong> Understanding how students perform in different subjects to
          identify areas needing improvement.
        </li>
        <li>
          <strong>Group-Based Insights:</strong> Analyzing performance across different student groups to ensure
          equitable educational support.
        </li>
        <li>
          <strong>Threshold-Based Reporting:</strong> Focusing on students who meet or exceed certain performance
          thresholds to tailor advanced programs or interventions.
        </li>
      </ul>
      <h2>Your Task</h2>
      <p>
        This file,
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${()=>k(j,`${t}.pdf`)}>
          ${t}.pdf
        </button>
        contains a table of student marks in Maths, Physics, English, Economics, and Biology.
      </p>
      <p>
        Calculate the total <code>${W}</code> marks of students who scored <code>${I}</code> or more marks in
        <code>${D}</code> in groups <code>${v}-${T}</code> (including both groups).
      </p>
      <ol>
        <li>
          <strong>Data Extraction:</strong>: Retrieve the PDF file containing the student marks table and use PDF
          parsing libraries (e.g., <code>Tabula</code>, <code>Camelot</code>, or <code>PyPDF2</code>) to accurately
          extract the table data into a workable format (e.g., CSV, Excel, or a DataFrame).
        </li>
        <li>
          <strong>Data Cleaning and Preparation:</strong> Convert marks to numerical data types to facilitate accurate
          calculations.
        </li>
        <li>
          <strong>Data Filtering:</strong> Identify students who have scored marks between <code>${I}</code> and
          <code>${D}</code> in groups <code>${v}-${T}</code> (including both groups).
        </li>
        <li>
          <strong>Calculation:</strong> Sum the marks of the filtered students to obtain the total marks for this
          specific cohort.
        </li>
      </ol>
      <p>
        By automating the extraction and analysis of student marks, EduAnalytics empowers Greenwood High School to make
        informed decisions swiftly. This capability enables the school to:
      </p>
      <ul>
        <li>
          <strong>Identify Performance Trends:</strong> Quickly spot areas where students excel or need additional
          support.
        </li>
        <li>
          <strong>Allocate Resources Effectively:</strong> Direct teaching resources and interventions to groups and
          subjects that require attention.
        </li>
        <li>
          <strong>Enhance Reporting Efficiency:</strong> Reduce the time and effort spent on manual data processing,
          allowing educators to focus more on teaching and student engagement.
        </li>
        <li>
          <strong>Support Data-Driven Strategies:</strong> Use accurate and timely data to shape educational strategies
          and improve overall student outcomes.
        </li>
      </ul>

      <label for="${t}" class="form-label">
        What is the total <code>${W}</code> marks of students who scored <code>${I}</code> or more marks in
        <code>${D}</code> in groups <code>${v}-${T}</code> (including both groups)?
      </label>
      <input class="form-control" id="${t}" name="${t}" type="number" required />
    </div>
  `;return{id:t,title:o,weight:n,question:$t,answer:wt}}var ot=b(()=>{tt();P()});var at={};w(at,{default:()=>Ut});import{html as O}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import*as A from"https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.17.0/+esm";import{default as Mt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";async function Ut({user:e,weight:n=1}){let t="q-duckdb-sales-over-time",o="DuckDB: Sales Over Time",a=Mt(`${e.email}#${t}`),c=await B.connect(),s=Array.from({length:1e4},()=>({timestamp:new Date(Date.UTC(2024,0,1)-Math.floor(a()*8*86400)*1e3),category:a()<.33?"Electronics":a()<.66?"Clothing":"Home Goods",amount:parseFloat((a()*100).toFixed(2))}));await B.registerFileText("sales.json",JSON.stringify(s)),await c.insertJSONFromPath("sales.json",{name:"sales"}),await c.close();let i=[],h=["hour",...new Set(s.map(m=>m.category))];for(let m of s){let d=m.timestamp.getUTCHours(),f=m.category,r=i[d]=i[d]||{};r.hour=d,r[f]=(r[f]||0)+m.amount}let u=O`
    <p>
      You are connected to a DuckDB database with a table called <code>sales</code> containing 10,000 rows of data with
      3 columns.
    </p>
    <ul>
      <li><code>timestamp</code>: When the sale occurred (for the week starting on 2024-01-01 UTC).</li>
      <li><code>category</code>: Category of product sold (e.g. "Electronics", "Clothing", ...).</li>
      <li><code>amount</code>: The sale value as a number (e.g. <code>12.34</code>).</li>
    </ul>

    <p>Write the DuckDB SQL query to find the total sales amounts for each product category, pivoted by hour:</p>
    <ul>
      <li>Aggregate total sales amounts into hourly intervals (UTC) and pivot the data.</li>
      <li>
        Show total sales amount per category per hour (filling missing combinations with zeros), to the nearest integer.
      </li>
      <li>Order rows chronologically by hour and columns in any order.</li>
    </ul>

    <details class="my-3">
      <summary>The result should look like this:</summary>
      <table class="table table-bordered">
        <thead>
          <tr>
            ${h.map(m=>O`<th>${m}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${Object.entries(i).map(([,m])=>O`<tr>
                ${h.map(d=>O`<td>${Math.round(m[d]??0,0)}</td>`)}
              </tr>`)}
        </tbody>
      </table>
    </details>

    <div class="mb-3">
      <label for="${t}" class="form-label"
        >What is the DuckDB SQL query to find the total sales amounts for each product category, pivoted by hour?</label
      >
      <textarea class="form-control font-monospace text-bg-dark" rows="6" id="${t}" name="${t}"></textarea>
      <p class="text-muted">
        We compare your response to the expected result by rounding the values to the nearest integer.
      </p>
    </div>
  `;return{id:t,title:o,weight:n,question:u,answer:async m=>{let d=await B.connect(),f=await d.query(m);await d.close();let r=f.toArray().map(l=>l.toJSON());if(console.table(r),i.length!==r.length)throw new Error(`Expected ${i.length} rows, got ${r.length}. See console for your response.`);for(let[l,y]of i.entries())for(let[,p]of h.entries()){let j=Math.round(y[p]??0),v=Math.round(Number(r[l][p]));if(j!==v)throw new Error(`Row ${l}, Col ${p}: Expected ${j}, got ${v}. See console for your response.`)}return!0}}}var Rt,z,zt,Ht,Nt,B,st=b(async()=>{Rt=A.getJsDelivrBundles(),z=await A.selectBundle(Rt),zt=URL.createObjectURL(new Blob([`importScripts("${z.mainWorker}");`],{type:"text/javascript"})),Ht=new Worker(zt),Nt=new A.ConsoleLogger,B=new A.AsyncDuckDB(Nt,Ht);await B.instantiate(z.mainModule,z.pthreadWorker)});function H(e){return Array.from({length:Math.floor(e()*10)+1},()=>nt[Math.floor(e()*nt.length)]).join("")}var nt,rt=b(()=>{nt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"});var it={};w(it,{default:()=>Yt});import{html as Jt}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as Gt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";import Qt from"https://cdn.jsdelivr.net/npm/jszip@3/+esm";async function Yt({user:e,weight:n=1}){let t="q-move-rename-files",o="Move and rename files",a=Gt(`${e.email}#${t}`),c=new Qt,s=new Set;for(let d=0;d<3;d++){let f=H(a).toLowerCase();for(let r=0;r<10;r++){let l=`${H(a)}.txt`.toLowerCase();s.has(l)||(s.add(l),c.file(`${f}/${l}`,"x"))}}let i=await c.generateAsync({type:"blob"}),h=[...new Set([...s].map(d=>`${d.replace(/[0-9]/g,f=>(parseInt(f)+1)%10)}:x
`))].sort().join(""),u=await $(h),g=d=>d.trim().split(/\s+/).at(0)===u,m=Jt`
    <div class="mb-3">
      <p>
        Download
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${()=>k(i,`${t}.zip`)}>
          ${t}.zip
        </button>
        and extract it. Use <code>mv</code> to move all files under folders into an empty folder. Then rename all files
        replacing each digit with the next. 1 becomes 2, 9 becomes 0, <code>a1b9c.txt</code> becomes
        <code>a2b0c.txt</code>.
      </p>

      <label for="${t}" class="form-label">
        What does running <code>grep . * | LC_ALL=C sort | sha256sum</code> in <code>bash</code> on that folder show?
      </label>
      <input class="form-control" id="${t}" name="${t}" />
    </div>
  `;return{id:t,title:o,weight:n,question:m,answer:g}}var ct=b(()=>{P();E();rt()});var dt={};w(dt,{default:()=>Xt});import{html as Kt}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as Vt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";async function Xt({user:e,weight:n=1}){let t="q-llm-embeddings",o="LLM Embeddings",a=Vt(`${e.email}#${t}`),c=[`Dear user, please verify your transaction code ${Math.floor(a()*1e5)} sent to ${e.email}`,`Dear user, please verify your transaction code ${Math.floor(a()*1e5)} sent to ${e.email}`],s=async h=>{let u=JSON.parse(h);if(u.model!=="text-embedding-3-small")throw new Error("Model must be text-embedding-3-small");if(u.input?.[0]!=c[0])throw new Error("The first input does not match the first text exactly");if(u.input?.[1]!=c[1])throw new Error("The second input does not match the second text exactly");return!0},i=Kt`
    <p>
      <strong>SecurePay</strong>, a leading fintech startup, has implemented an innovative feature to detect and prevent
      fraudulent activities in real time. As part of its security suite, the system analyzes personalized transaction
      messages by converting them into embeddings. These embeddings are compared against known patterns of legitimate
      and fraudulent messages to flag unusual activity.
    </p>
    <p>
      Imagine you are working on the SecurePay team as a junior developer tasked with integrating the text embeddings
      feature into the fraud detection module. When a user initiates a transaction, the system sends a personalized
      verification message to the user's registered email address. This message includes the user's email address and a
      unique transaction code (a randomly generated number). Here are 2 verification messages:
    </p>
    <pre><code>${c[0]}</code></pre>
    <pre><code>${c[1]}</code></pre>
    <p>
      The goal is to capture this message, convert it into a meaningful embedding using OpenAI's
      <code>text-embedding-3-small</code> model, and subsequently use the embedding in a machine learning model to
      detect anomalies.
    </p>
    <p>
      Your task is to write the JSON body for a POST request that will be sent to the OpenAI API endpoint to obtain the
      text embedding for the 2 given personalized transaction verification messages above. This will be sent to the
      endpoint
      <code>https://api.openai.com/v1/embeddings</code>.
    </p>

    <div class="mb-3">
      <label for="${t}" class="form-label">Write your JSON body here:</label>
      <textarea class="form-control font-monospace text-bg-dark" rows="6" id="${t}" name="${t}"></textarea>
    </div>
  `;return{id:t,title:o,weight:n,question:i,answer:s}}var lt=b(()=>{});var ut={};w(ut,{default:()=>_t});import{html as L}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as Zt}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";async function _t({user:e,weight:n=2}){let t="q-region-containing-point",o="Region Containing Point",a=Zt(`${e.email}#${t}`),{cities:c,regions:s,groups:i}=await fetch("data-cities-regions.json").then(d=>d.json()),{points:h,hash:u}=i[Math.floor(a()*i.length)],g=L`
    <p>
      You are the operations manager for World Courier. You have divided your business across ${s.length}
      franchisees, giving each a region. All couriers from inside the franchisee's region must be picked up by that
      franchisee.
    </p>
    <p>You have new requests from these latitudes and longitudes:</p>
    <table class="table">
      <thead>
        <tr>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        ${h.map(([d,f])=>L`<tr>
              <td>${d}</td>
              <td>${f}</td>
            </tr>`)}
      </tbody>
    </table>

    <details class="my-3">
      <summary>Here are the franchisee numbers and the cities that mark their region's boundary.</summary>
      <table class="table">
        <thead>
          <tr>
            <th>Franchisee</th>
            <th>Cities [Latitude, Longitude]</th>
          </tr>
        </thead>
        <tbody>
          ${s.map((d,f)=>L`<tr>
                <td>${f+1}</td>
                <td>${d.map(r=>L`<div>${r} ${JSON.stringify(c[r])}</div>`)}</td>
              </tr>`)}
        </tbody>
      </table>
    </details>

    <p>Any point inside a region is served by the corresponding franchisee.</p>
    <p>Assume the Earth is flat.</p>
    <p>Write the answer as a sequence of franchisee numbers separated by commas (e.g. "20,9,12,12,3").</p>
    <input class="form-control" id="${t}" name="${t}" />
    <p class="text-muted">
      The franchisee numbers should be in the order of the pickup points. We strip spaces around the commas or
      franchisee numbers before checking. It's OK if multiple points fall into the same franchisee region.
    </p>
  `;return{id:t,title:o,weight:n,question:g,answer:async d=>{let f=d.split(",").map(r=>r.trim()).join(",");return u===await $(f)}}}var mt=b(()=>{E()});var ht={};w(ht,{default:()=>ee});import{html as N}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as te}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";async function ee({user:e,weight:n=2}){let t="q-shortest-path-between-cities",o="Shortest Path Between Cities",a=te(`${e.email}#${t}`),{cities:c,links:s,answers:i}=await fetch("data-cities-shortest-paths.json").then(r=>r.json()),{city1:h,city2:u,length:g,hash:m}=i[Math.floor(a()*i.length)],d=N`
    <p>
      You are the operations manager for World Courier. You are trying to find the shortest path between
      <code>${h}</code> and <code>${u}</code>.
    </p>
    <p>
      World Courier has a fleet of aircraft that can fly directly between specific cities. The distance between two
      cities is the <a href="https://pypi.org/project/haversine/">Haversine distance</a>.
    </p>

    <p>What is the sequence of cities that you should fly to minimize the total distance traveled?</p>

    <details class="my-3">
      <summary>Here are the flight connections between cities provided by World Courier:</summary>
      <table class="table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(([r,l])=>N`<tr>
                <td>${r}</td>
                <td>${l}</td>
              </tr>`)}
        </tbody>
      </table>
    </details>

    <details class="my-3">
      <summary>Here is a list of cities with their latitude and longitude.</summary>
      <table class="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(c).map(([r,[l,y]])=>N`<tr>
                <td>${r}</td>
                <td>${l}</td>
                <td>${y}</td>
              </tr>`)}
        </tbody>
      </table>
    </details>

    <p>Write the answer as a sequence of cities separated by commas.</p>
    <input class="form-control" id="${t}" name="${t}" />
    <p class="text-muted">
      The cities should be in the order you would fly them. We strip spaces around the commas or city names before
      checking.
    </p>
  `;return{id:t,title:o,weight:n,question:d,answer:async r=>{let l=r.split(",").map(y=>y.trim()).join(",");if(m===await $(l))return!0;throw new Error(`Incorrect. Hint: There are ${g} cities in the shortest path.`)}}}var pt=b(()=>{E()});var ft={};w(ft,{default:()=>ne});import{html as oe}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";import{default as ae}from"https://cdn.jsdelivr.net/npm/seedrandom/+esm";import{sampleCorrelation as se}from"https://cdn.jsdelivr.net/npm/simple-statistics@7/+esm";async function ne({user:e,weight:n=1.5}){let t="q-calculate-correlation",o="Calculate correlation",a=ae(`${e.email}#${t}`),c=a()*2-1,s=Array.from({length:1e4},()=>{let u=a()*1e3,g=a()*200-100;return{A:Math.floor(u),B:Math.floor(u*c+g)}}),i=se(s.map(u=>u.A),s.map(u=>u.B)).toFixed(3),h=oe`
    <p>
      Download
      <button
        class="btn btn-sm btn-outline-primary"
        type="button"
        @click=${()=>k(new Blob([JSON.stringify(s)],{type:"application/json"}),`${t}.json`)}
      >
        ${t}.json
      </button>
      . It contains an array of objects, each with 2 numerical columns: A and B.
    </p>
    <div class="mb-3">
      <label for="${t}" class="form-label">What is the Pearson correlation coefficient between columns A and B?</label>
      <input class="form-control" id="${t}" name="${t}" />
      <p class="text-muted">
        Calculate the sample correlation coefficient using Python, Excel, or JavaScript. The data doesn't have any
        missing values. Write the answer rounded to 3 decimal places, e.g.
        <code>-0.769</code>.
      </p>
    </div>
  `;return{id:t,title:o,weight:n,question:h,answer:i}}var gt=b(()=>{P()});import{html as q,render as At}from"https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";function J(e,n){At([q`<h1 class="display-6">Questions</h1>`,q`<ol class="mt-3">
        ${e.map(({id:t,title:o,weight:a})=>q`<li><a href="#h${t}">${o}</a> (${a} ${a==1?"mark":"marks"})</li>`)}
      </ol>`,...e.map(({id:t,title:o,weight:a,question:c,help:s},i)=>(s&&!Array.isArray(s)&&(s=[s]),q`
          <div class="card my-5" data-question="${t}" id="h${t}">
            <div class="card-header">
              <span class="badge text-bg-primary me-2">${i+1}</span>
              ${o} (${a} ${a==1?"mark":"marks"})
            </div>
            ${s?s.map(h=>q`<div class="card-body border-bottom">${h}</div>`):""}
            <div class="card-body">${c}</div>
            <div class="card-footer d-flex">
              <button type="button" class="btn btn-primary check-answer" data-question="${t}">Check</button>
            </div>
          </div>
        `))],n)}async function Ve(e,n){e.email=`roe-${e.email}`;let t=[await Promise.resolve().then(()=>(Q(),G)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(K(),Y)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(_(),Z)).then(o=>o.default({user:e})),await Promise.resolve().then(()=>(ot(),et)).then(o=>o.default({user:e,weight:1})),await st().then(()=>at).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(ct(),it)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(lt(),dt)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(mt(),ut)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(pt(),ht)).then(o=>o.default({user:e,weight:1})),await Promise.resolve().then(()=>(gt(),ft)).then(o=>o.default({user:e,weight:1}))];return J(t,n),Object.fromEntries(t.map(({id:o,...a})=>[o,a]))}export{Ve as questions};
