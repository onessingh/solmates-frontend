const fs = require('fs');
const textToAppend = `
        "[Marketing] Competitive Marketing": [
            { q: "Competitive advantage is:", options: ["Having the most employees", "An attribute that allows an organization to outperform its competitors", "Being the oldest firm in the industry", "Offering the lowest price always"], a: 1 },
            { q: "Michael Porter identified how many generic competitive strategies?", options: ["2", "3", "4", "5"], a: 2 },
            { q: "In a 'Red Ocean', competition is:", options: ["Non-existent", "Fierce in existing markets", "Only among new startups", "Based solely on quality"], a: 1 },
            { q: "A market challenger strategy typically involves:", options: ["Maintaining the status quo", "Attacking the market leader to gain market share", "Focusing only on a small niche", "Exiting the market"], a: 1 },
            { q: "A market follower strategy is characterized by:", options: ["Aggressive price cuts", "Imitating or adapting the leader's products", "Creating entirely new products", "Spending the most on R&D"], a: 1 },
            { q: "Competitive intelligence refers to:", options: ["Corporate espionage", "Ethical gathering and analysis of information about competitors", "Hiring competitors' employees", "Stealing trade secrets"], a: 1 },
            { q: "A frontal attack in competitive marketing means:", options: ["Attacking a competitor's weaknesses", "Matching the competitor product, advertising, price, and distribution", "Ignoring the competitor", "Attacking entirely new markets"], a: 1 },
            { q: "A flank attack focuses on:", options: ["The competitor's strong points", "Uncontested or weak areas of the competitor", "Direct price wars", "Legal battles"], a: 1 },
            { q: "Barrier to entry prevents:", options: ["Customers from leaving", "New competitors from easily entering an industry", "Employees from resigning", "Suppliers from raising prices"], a: 1 },
            { q: "A market nicher focuses on:", options: ["The entire mass market", "Multiple large segments", "A specific, specialized segment ignored by larger firms", "International markets only"], a: 2 }
        ],
        "[Marketing] Business Marketing": [
            { q: "Business Marketing is also known as:", options: ["B2C Marketing", "B2B Marketing", "C2C Marketing", "Internal Marketing"], a: 1 },
            { q: "Demand in business markets is often:", options: ["Elastic", "Independent", "Derived from consumer demand", "Predictable"], a: 2 },
            { q: "A Buying Center is:", options: ["A physical location where purchases are made", "All the individuals involved in the business purchasing decision process", "The finance department", "A government procurement agency"], a: 1 },
            { q: "Which is a characteristic of business markets compared to consumer markets?", options: ["Fewer, larger buyers", "Many small buyers", "Shorter sales cycles", "Emotional buying motives"], a: 0 },
            { q: "A 'straight rebuy' refers to:", options: ["Buying a completely new product", "Routinely reordering a product without modifications", "Buying with modifications", "Negotiating a new contract"], a: 1 },
            { q: "A 'modified rebuy' occurs when:", options: ["The buyer wants to change product specifications, prices, terms, or suppliers", "The buyer reorders automatically", "The buyer purchases a product for the first time", "The buyer stops purchasing"], a: 0 },
            { q: "Which role in the buying center formally controls the flow of information?", options: ["User", "Decider", "Gatekeeper", "Buyer"], a: 2 },
            { q: "In B2B marketing, personal selling is:", options: ["Rarely used", "The most important promotional tool", "Less important than TV advertising", "Only used for inexpensive items"], a: 1 },
            { q: "Joint demand occurs when:", options: ["Two companies buy together", "Demand for one product depends on the demand for another product used together", "Consumers and businesses buy the same product", "Competitors collude"], a: 1 },
            { q: "System buying involves:", options: ["Buying individual parts from different suppliers", "Buying a complete solution to a problem from a single seller", "Buying only software systems", "Purchasing through an auction"], a: 1 }
        ],
        "[Marketing] Sales Force Management": [
            { q: "The primary function of a sales manager is to:", options: ["Design the product", "Plan, direct, and control the personal selling activities", "Manage the company's social media", "Set the overall marketing budget"], a: 1 },
            { q: "Sales quotas are used to:", options: ["Limit how much a salesperson can earn", "Set performance goals and targets for sales representatives", "Restrict the number of customers", "Determine product prices"], a: 1 },
            { q: "Which compensation plan provides maximum security but least incentive?", options: ["Straight commission", "Straight salary", "Salary plus commission", "Bonus only"], a: 1 },
            { q: "A geographical sales structure organizes the sales force by:", options: ["Product lines", "Customer types", "Physical territories or regions", "Salesperson seniority"], a: 2 },
            { q: "Prospecting in the sales process refers to:", options: ["Closing the deal", "Handling objections", "Identifying potential qualified customers", "Following up after the sale"], a: 2 },
            { q: "The 'close' in a sales presentation is:", options: ["The introduction", "Asking for the order or commitment", "Leaving the client's office", "Demonstrating the product"], a: 1 },
            { q: "A sales funnel represents:", options: ["The physical container for sales documents", "The stages a prospect goes through from lead to customer", "The commission structure", "The territory map"], a: 1 },
            { q: "Which metric measures the percentage of leads that become customers?", options: ["Lead rate", "Conversion rate", "Retention rate", "Churn rate"], a: 1 },
            { q: "Sales forecasting is the process of:", options: ["Estimating future sales revenue", "Setting sales territories", "Evaluating salesperson performance", "Designing compensation plans"], a: 0 },
            { q: "Key Account Management (KAM) focuses on:", options: ["Handling small, infrequent buyers", "Building long-term relationships with the company's most important customers", "Managing the accounting department", "Automating the sales process"], a: 1 }
        ],
        "[Marketing] Marketing Analytics": [
            { q: "Marketing analytics is primarily used to:", options: ["Design creative ads", "Measure, manage, and analyze marketing performance to maximize effectiveness", "Hire marketing staff", "Manage inventory"], a: 1 },
            { q: "Customer Lifetime Value (CLV) estimates:", options: ["The total amount a customer spends in one transaction", "The total net profit a company makes from a customer over their entire relationship", "The age of the customer", "The cost to acquire a customer"], a: 1 },
            { q: "CAC stands for:", options: ["Customer Average Cost", "Customer Acquisition Cost", "Company Advertising Cost", "Cost Analytics Center"], a: 1 },
            { q: "A good marketing strategy should aim for a CLV to CAC ratio of at least:", options: ["1:1", "3:1", "1:3", "100:1"], a: 1 },
            { q: "Churn rate measures:", options: ["The rate at which new customers are acquired", "The percentage of customers who stop using a product or service", "The speed of the sales cycle", "The ROI of an ad campaign"], a: 1 },
            { q: "Attribution modeling in digital marketing helps to:", options: ["Determine which touchpoints contributed to a conversion", "Calculate the server speed", "Design the website layout", "Set the product price"], a: 0 },
            { q: "Which type of analytics focuses on predicting future outcomes based on historical data?", options: ["Descriptive analytics", "Diagnostic analytics", "Predictive analytics", "Prescriptive analytics"], a: 2 },
            { q: "A/B testing is used to:", options: ["Test two entirely different products", "Compare two versions of a marketing asset to see which performs better", "Test the accounting software", "Test employee performance"], a: 1 },
            { q: "ROI (Return on Investment) in marketing is calculated as:", options: ["(Net Profit / Marketing Investment) * 100", "Total Revenue - Total Cost", "Marketing Spend / Number of Leads", "Total Sales / Total Employees"], a: 0 },
            { q: "Data visualization in analytics is important because it:", options: ["Makes data look pretty without adding value", "Helps stakeholders easily understand complex data and trends", "Replaces the need for data analysis", "Is required by law"], a: 1 }
        ],
        "[Marketing] Rural Marketing": [
            { q: "Rural marketing involves:", options: ["Selling only agricultural products", "Marketing to and from rural areas", "Marketing only in large metropolitan cities", "Selling luxury cars"], a: 1 },
            { q: "A major challenge in rural marketing in India is:", options: ["Overcrowded markets", "High literacy rates", "Scattered population and poor infrastructure", "Excessive internet penetration"], a: 2 },
            { q: "The rural consumer in India is generally:", options: ["Highly brand loyal", "Value-conscious and price-sensitive", "Impulse buyers", "Not interested in quality"], a: 1 },
            { q: "Project Shakti is a famous rural marketing initiative by:", options: ["Reliance", "HUL (Hindustan Unilever Limited)", "Tata", "Patanjali"], a: 1 },
            { q: "Which pricing strategy is commonly used for FMCG products in rural markets?", options: ["Premium pricing", "Skimming pricing", "Penetration pricing and low unit packs (sachets)", "Dynamic pricing"], a: 2 },
            { q: "Choupal is a traditional concept referring to:", options: ["A rural market", "A village gathering place", "A type of crop", "A farming tool"], a: 1 },
            { q: "E-Choupal was launched by which company to empower farmers?", options: ["ITC", "HUL", "Godrej", "Mahindra"], a: 0 },
            { q: "A 'Haat' in rural marketing context refers to:", options: ["A permanent retail store", "A periodic local market", "An online marketplace", "A wholesale distributor"], a: 1 },
            { q: "Promotion in rural markets relies heavily on:", options: ["English newspapers", "Social media influencers", "Local language, wall paintings, and street plays", "National television only"], a: 2 },
            { q: "Contract farming involves:", options: ["Farmers renting land", "An agreement between farmers and processing/marketing firms for production", "Government buying all produce", "Farmers selling directly to consumers"], a: 1 }
        ],
        // --- SEMESTER 4 OB & HRM ---
        "[OB & HRM] Human Resource Metrics and Analytics": [
            { q: "HR Analytics refers to:", options: ["Managing payroll manually", "Applying statistical techniques to HR data to improve decision-making", "Conducting employee interviews", "Filing HR paperwork"], a: 1 },
            { q: "Which metric measures the cost of replacing an employee who leaves?", options: ["Time-to-fill", "Cost-per-hire", "Turnover cost", "Revenue per employee"], a: 2 },
            { q: "Time-to-fill measures:", options: ["How long an employee stays in a job", "The number of days from job requisition to job offer acceptance", "The duration of a training program", "How long it takes to run payroll"], a: 1 },
            { q: "Absenteeism rate is calculated by:", options: ["Total hours absent / Total hours scheduled", "Total employees / Total absentees", "Total sick leave / Total vacation", "Number of doctors notes / Employees"], a: 0 },
            { q: "Predictive HR analytics can be used to:", options: ["Print historical reports", "Identify which employees are most likely to resign", "Calculate last month's payroll", "Write job descriptions"], a: 1 },
            { q: "Revenue per employee is a metric of:", options: ["Employee satisfaction", "Workforce productivity", "Recruitment efficiency", "Training effectiveness"], a: 1 },
            { q: "Engagement score is typically measured through:", options: ["Financial audits", "Employee surveys", "Customer feedback", "Time tracking software"], a: 1 },
            { q: "Which level of HR analytics answers 'What happened?'", options: ["Predictive", "Prescriptive", "Descriptive", "Diagnostic"], a: 2 },
            { q: "Quality of hire can be measured by:", options: ["The speed of the interview", "New hire performance and retention rates", "The cost of the job ad", "The number of applicants"], a: 1 },
            { q: "Benchmarking in HR metrics means:", options: ["Comparing HR data against industry standards or competitors", "Setting the lowest possible targets", "Creating physical benchmarks in the office", "Ignoring external data"], a: 0 }
        ],
        "[OB & HRM] Managing Interpersonal and Group Processes": [
            { q: "Groupthink occurs when:", options: ["A group brainstorms highly creative ideas", "Desire for harmony in a group results in an irrational or dysfunctional decision", "A group cannot agree on anything", "Individuals think independently"], a: 1 },
            { q: "Tuckman's stages of group development are Forming, Storming, Norming, Performing, and:", options: ["Transforming", "Adjourning", "Conforming", "Reforming"], a: 1 },
            { q: "Social loafing is the tendency for individuals to:", options: ["Work harder in a group", "Expel less effort when working collectively than when working individually", "Take on leadership roles", "Socialize instead of working"], a: 1 },
            { q: "The Johari Window is a tool used for:", options: ["Financial forecasting", "Understanding and improving self-awareness and interpersonal communication", "Evaluating project risks", "Designing office layouts"], a: 1 },
            { q: "In the Johari Window, the 'Blind Area' represents:", options: ["Known to self, known to others", "Not known to self, known to others", "Known to self, not known to others", "Not known to self, not known to others"], a: 1 },
            { q: "Transactional Analysis (TA) analyzes interactions based on three ego states:", options: ["Id, Ego, Superego", "Parent, Adult, Child", "Leader, Follower, Observer", "Thinker, Feeler, Doer"], a: 1 },
            { q: "A sociogram is used to:", options: ["Measure company profits", "Map the structure of interpersonal relations in a group", "Create job descriptions", "Track employee attendance"], a: 1 },
            { q: "Which conflict resolution style involves high cooperativeness and high assertiveness?", options: ["Avoiding", "Accommodating", "Collaborating", "Competing"], a: 2 },
            { q: "Active listening requires:", options: ["Formulating a response while the other speaks", "Interrupting to clarify", "Fully concentrating, understanding, responding and remembering", "Agreeing with everything said"], a: 2 },
            { q: "Role ambiguity in a group occurs when:", options: ["Two people have the same role", "An individual's job duties and expectations are not clearly defined", "A person has too many roles", "The leader resigns"], a: 1 }
        ],
        "[OB & HRM] Counseling Skills for Managers": [
            { q: "The primary purpose of workplace counseling is to:", options: ["Diagnose severe mental illnesses", "Help employees overcome personal or work-related problems affecting performance", "Punish poor performance", "Determine salary increases"], a: 1 },
            { q: "Which is a key skill required for effective counseling?", options: ["Sympathy", "Empathy", "Apathy", "Authority"], a: 1 },
            { q: "Directive counseling is characterized by:", options: ["The counselor listening and the employee solving the problem", "The counselor taking an active role in diagnosing and offering solutions", "Complete silence from the counselor", "Group therapy sessions"], a: 1 },
            { q: "Non-directive (client-centered) counseling was developed by:", options: ["Sigmund Freud", "Carl Rogers", "B.F. Skinner", "Abraham Maslow"], a: 1 },
            { q: "In counseling, 'paraphrasing' means:", options: ["Ignoring the employee's words", "Restating the employee's message in the counselor's own words to ensure understanding", "Reading from a script", "Giving direct advice"], a: 1 },
            { q: "Confidentiality in workplace counseling is:", options: ["Not important", "Crucial for building trust, with certain legal/safety exceptions", "Only maintained for senior management", "Illegal"], a: 1 },
            { q: "An Employee Assistance Program (EAP) provides:", options: ["Financial loans to employees", "Confidential professional counseling and support services", "Technical training", "Travel booking services"], a: 1 },
            { q: "Which of the following is a barrier to effective counseling?", options: ["Active listening", "Empathy", "Judgmental attitude", "Unconditional positive regard"], a: 2 },
            { q: "Catharsis in counseling refers to:", options: ["The release of emotional tension", "Setting goals", "Taking disciplinary action", "Writing a report"], a: 0 },
            { q: "When a manager recognizes a problem is beyond their capability to counsel, they should:", options: ["Ignore it", "Refer the employee to a professional counselor or EAP", "Fire the employee immediately", "Tell other employees"], a: 1 }
        ],
        "[OB & HRM] Management of Industrial Relations": [
            { q: "Industrial Relations (IR) primarily deals with the relationship between:", options: ["Company and customers", "Management, employees/trade unions, and the government", "Suppliers and buyers", "Shareholders and board of directors"], a: 1 },
            { q: "A Trade Union is an organization of:", options: ["Employers only", "Workers formed to protect and promote their interests", "Government officials", "Customers"], a: 1 },
            { q: "Collective bargaining is a process where:", options: ["The CEO makes unilateral decisions", "Representatives of management and unions negotiate terms of employment", "Employees vote on the color of the office", "The government dictates wages"], a: 1 },
            { q: "In IR, a 'strike' is initiated by:", options: ["Management", "Government", "Employees/Union", "Customers"], a: 2 },
            { q: "A 'lockout' is initiated by:", options: ["Employees", "Management/Employers", "Trade Unions", "Government"], a: 1 },
            { q: "The Industrial Disputes Act in India was passed in:", options: ["1926", "1947", "1956", "1991"], a: 1 },
            { q: "Conciliation in dispute resolution involves:", options: ["A binding decision by a judge", "A neutral third party helping the disputing parties reach a mutual agreement", "A police investigation", "Ignoring the dispute"], a: 1 },
            { q: "Arbitration differs from conciliation because the arbitrator:", options: ["Only listens", "Makes a binding decision/award", "Represents the union", "Is a company employee"], a: 1 },
            { q: "Grievance handling procedure is meant to:", options: ["Punish whistleblowers", "Address and resolve individual employee complaints systematically", "Determine bonuses", "Manage customer complaints"], a: 1 },
            { q: "Workers' Participation in Management (WPM) aims to:", options: ["Replace the CEO with a worker", "Involve employees in the decision-making process", "Eliminate trade unions", "Increase working hours"], a: 1 }
        ],
        "[OB & HRM] Negotiation and Influence Skills": [
            { q: "Distributive negotiation is often referred to as:", options: ["Win-Win", "Zero-sum or Win-Lose", "Collaborative", "Integrative"], a: 1 },
            { q: "Integrative negotiation focuses on:", options: ["Maximizing one's own slice of the pie", "Creating value and finding Win-Win solutions", "Deceiving the other party", "Refusing to compromise"], a: 1 },
            { q: "BATNA stands for:", options: ["Best Alternative To a Negotiated Agreement", "Basic Agreement Towards National Alignment", "Better Approach To Negotiate Anything", "Best Action To Neutralize Anger"], a: 0 },
            { q: "The 'Reservation Price' in negotiation is:", options: ["The opening offer", "The walk-away point or the absolute minimum/maximum acceptable", "The target price", "The retail price"], a: 1 },
            { q: "ZOPA stands for:", options: ["Zone of Potential Agreement", "Zone of Past Actions", "Zero Option Practical Agreement", "Zone of Possible Alternatives"], a: 0 },
            { q: "Anchoring in negotiation refers to:", options: ["Stopping the negotiation", "The cognitive bias where the first offer heavily influences the rest of the negotiation", "Securing a boat", "Signing the final contract"], a: 1 },
            { q: "According to Cialdini, the principle of 'Reciprocity' means:", options: ["People follow authority", "People feel obliged to return favors", "People want scarce items", "People like those similar to them"], a: 1 },
            { q: "The influence principle of 'Social Proof' suggests that people:", options: ["Look to the actions of others to determine their own", "Only trust experts", "Need written contracts", "Always act selfishly"], a: 0 },
            { q: "Active listening in negotiation is important to:", options: ["Formulate counter-arguments while they speak", "Understand the other party's underlying interests and needs", "Intimidate the opponent", "Make the negotiation longer"], a: 1 },
            { q: "A 'Bogey' tactic in negotiation involves:", options: ["Telling the truth", "Pretending an issue is very important when it is actually not", "Walking out of the room", "Calling the police"], a: 1 }
        ],
        // --- SEMESTER 4 OPERATIONS & STRATEGY ---
        "[Operations] Operations Strategy": [
            { q: "Operations strategy must be aligned with:", options: ["Marketing strategy only", "The overall corporate/business strategy", "HR strategy only", "Competitors' strategy"], a: 1 },
            { q: "The concept of 'Order Winners' refers to:", options: ["Minimum standards required to compete", "Characteristics that cause customers to choose a product over competitors", "Salesmen who close the most deals", "The first company to enter a market"], a: 1 },
            { q: "Order Qualifiers are:", options: ["The criteria that differentiate a product", "The minimum performance levels required to even be considered by a customer", "The managers who approve purchases", "Quality certificates"], a: 1 },
            { q: "Mass customization aims to:", options: ["Produce standard goods cheaply", "Deliver highly customized products with the efficiency of mass production", "Eliminate all variations", "Focus only on luxury markets"], a: 1 },
            { q: "Which competitive priority focuses on quick delivery and time-to-market?", options: ["Cost", "Quality", "Flexibility", "Speed/Time"], a: 3 },
            { q: "The Hayes-Wheelwright framework describes:", options: ["Four stages of operations' strategic role in a company", "Marketing channels", "Inventory models", "Leadership styles"], a: 0 },
            { q: "Capacity strategy deals with decisions about:", options: ["Employee salaries", "When, where, and how much facility capacity is needed", "Advertising budget", "Product design"], a: 1 },
            { q: "Outsourcing is a strategic decision to:", options: ["Do everything internally", "Have external suppliers perform processes previously done internally", "Sell the company", "Hire more permanent staff"], a: 1 },
            { q: "Agile manufacturing focuses on:", options: ["Rigid, long-term plans", "Rapid response to customer needs and market changes", "Maximizing inventory", "Using the oldest technology"], a: 1 },
            { q: "The 'Trade-off' concept in operations strategy suggests:", options: ["You can excel at everything simultaneously", "Improving one aspect (e.g., cost) often requires sacrificing another (e.g., speed)", "Trading goods with other countries", "Swapping employees"], a: 1 }
        ],
        "[Operations] Technology, Innovation and New Product Management": [
            { q: "The Technology Life Cycle generally follows which curve?", options: ["U-curve", "S-curve", "Linear line", "V-curve"], a: 1 },
            { q: "Concurrent engineering in new product development involves:", options: ["Sequential design steps", "Different departments working simultaneously to reduce development time", "Only engineers working on the project", "Developing two competing products"], a: 1 },
            { q: "QFD (Quality Function Deployment) is used to:", options: ["Deploy quality inspectors", "Translate customer requirements into engineering specifications", "Reduce manufacturing costs", "Manage inventory"], a: 1 },
            { q: "The 'House of Quality' is a key matrix used in:", options: ["Six Sigma", "QFD", "JIT", "MRP"], a: 1 },
            { q: "A 'Stage-Gate' process is used for:", options: ["Managing inventory", "Guiding new product development projects from idea to launch", "Hiring employees", "Quality control"], a: 1 },
            { q: "Open innovation involves:", options: ["Keeping all R&D strictly internal", "Using both internal and external ideas to advance technology", "Copying competitors openly", "Ignoring patents"], a: 1 },
            { q: "Technology push innovation starts with:", options: ["A customer need", "A new technological discovery seeking an application", "A marketing campaign", "Competitor analysis"], a: 1 },
            { q: "Market pull innovation starts with:", options: ["A laboratory breakthrough", "An identified market need or problem", "Government regulation", "Excess inventory"], a: 1 },
            { q: "CAD stands for:", options: ["Computer-Aided Design", "Cost And Demand", "Central Analytics Database", "Creative Art Department"], a: 0 },
            { q: "Time-to-market refers to:", options: ["The time a store stays open", "The time it takes from product conception to commercial availability", "The delivery time to a customer", "The time an ad runs"], a: 1 }
        ],
        "[Operations] System Optimization and Management Science": [
            { q: "Management Science is primarily concerned with:", options: ["Managing human behavior", "Applying quantitative/mathematical models to decision making", "Marketing strategies", "Financial accounting"], a: 1 },
            { q: "In optimization, the 'Objective Function' is what you want to:", options: ["Ignore", "Maximize or minimize (e.g., profit or cost)", "Keep constant", "Divide"], a: 1 },
            { q: "Constraints in an optimization model represent:", options: ["Infinite resources", "Limitations or requirements that must be met", "The final profit", "Decision variables"], a: 1 },
            { q: "The Simplex Method is an algorithm used to solve:", options: ["Quadratic equations", "Linear programming problems", "Decision trees", "Queuing models"], a: 1 },
            { q: "Queuing theory is the mathematical study of:", options: ["Waiting lines", "Inventory costs", "Transportation routes", "Stock market trends"], a: 0 },
            { q: "In queuing theory, the 'service rate' refers to:", options: ["How much customers pay", "The number of customers a server can handle per time unit", "The time a customer waits", "The quality of the product"], a: 1 },
            { q: "Simulation modeling is useful when:", options: ["The problem is simple and deterministic", "The real system is too complex or costly to experiment with directly", "Exact analytical solutions are easy to find", "Only one variable exists"], a: 1 },
            { q: "Markov Analysis is used to predict future behavior based on:", options: ["Current state probabilities", "Past 10 years of data only", "Expert opinions", "Random guessing"], a: 0 },
            { q: "The Traveling Salesman Problem is an example of:", options: ["Linear programming", "Combinatorial optimization / Routing problem", "Inventory management", "Queuing theory"], a: 1 },
            { q: "A decision variable in a model represents:", options: ["The final answer", "A choice that the decision maker can control (e.g., how much to produce)", "A fixed constraint", "The inflation rate"], a: 1 }
        ],
        "[Operations] Supply Chain Analytics": [
            { q: "Supply Chain Analytics involves using data to:", options: ["Design advertisements", "Improve visibility, efficiency, and decision-making in the supply chain", "Hire HR staff", "Audit financial statements"], a: 1 },
            { q: "The Bullwhip Effect refers to:", options: ["Using whips to motivate workers", "Demand variability amplifying as it moves up the supply chain", "Rapid delivery times", "Consistent demand forecasting"], a: 1 },
            { q: "Which type of analytics predicts future supply chain disruptions?", options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"], a: 2 },
            { q: "Prescriptive analytics in supply chain aims to:", options: ["Describe past performance", "Recommend the best course of action for a given situation", "Predict customer demand", "Visualize data"], a: 1 },
            { q: "RFID technology in supply chains provides data for:", options: ["Customer demographics", "Real-time tracking and visibility of inventory", "Employee attendance", "Financial auditing"], a: 1 },
            { q: "Safety stock analytics helps determine:", options: ["The color of packaging", "The optimal level of extra inventory to prevent stockouts", "Marketing budgets", "The number of delivery trucks"], a: 1 },
            { q: "Network optimization in supply chain analytics is used to:", options: ["Optimize computer networks", "Determine the best locations and flows for facilities and distribution", "Optimize social media reach", "Reduce internet costs"], a: 1 },
            { q: "Demand forecasting accuracy is typically measured using:", options: ["ROI", "MAPE (Mean Absolute Percentage Error)", "P/E Ratio", "Click-through rate"], a: 1 },
            { q: "Dashboard visualizations in supply chain are used to:", options: ["Hide data from competitors", "Monitor Key Performance Indicators (KPIs) in real-time", "Design products", "Process payroll"], a: 1 },
            { q: "Blockchain technology in supply chain analytics is primarily valued for:", options: ["Speeding up delivery trucks", "Providing immutable traceability and transparency", "Creating cryptocurrencies", "Designing packaging"], a: 1 }
        ],
        "[Operations] Supply Chain Management": [
            { q: "The primary objective of Supply Chain Management is to:", options: ["Maximize inventory", "Maximize overall value generated and satisfy customer needs efficiently", "Minimize number of suppliers", "Maximize transportation costs"], a: 1 },
            { q: "Upstream supply chain refers to activities moving towards:", options: ["The end customer", "The raw material suppliers", "The retail stores", "The marketing department"], a: 1 },
            { q: "Downstream supply chain refers to activities moving towards:", options: ["Suppliers", "The end customer", "Manufacturing plants", "Raw material extraction"], a: 1 },
            { q: "3PL stands for:", options: ["Third-Party Logistics", "Three Point Location", "Total Product Life", "Third Priority Level"], a: 0 },
            { q: "Cross-docking is a logistics technique where:", options: ["Ships cross paths", "Incoming materials are transferred directly to outbound transport with minimal storage", "Inventory is stored for long periods", "Prices are negotiated"], a: 1 },
            { q: "Reverse logistics involves:", options: ["Driving trucks backwards", "Managing product returns, recycling, and disposal", "Paying suppliers", "Marketing to previous customers"], a: 1 },
            { q: "Vendor Managed Inventory (VMI) means:", options: ["The buyer manages the inventory", "The supplier takes responsibility for managing the buyer's inventory", "The government manages inventory", "Inventory is sold to vendors"], a: 1 },
            { q: "The 'Push' supply chain model is based on:", options: ["Actual customer orders", "Anticipated demand forecasts", "Zero inventory", "Just-In-Time manufacturing"], a: 1 },
            { q: "The 'Pull' supply chain model is driven by:", options: ["Forecasts", "Actual customer demand/orders", "Supplier capacity", "Marketing promotions"], a: 1 },
            { q: "Lead time in SCM is:", options: ["The time a leader spends managing", "The time from placing an order to receiving it", "The time a product lasts", "The time to design a product"], a: 1 }
        ],
        "[Strategy] Strategic Capability Building and Innovation": [
            { q: "Dynamic capabilities refer to a firm's ability to:", options: ["Maintain static processes", "Integrate, build, and reconfigure internal and external competences to address changing environments", "Fire and hire employees rapidly", "Change prices dynamically"], a: 1 },
            { q: "Core rigidities occur when:", options: ["A firm becomes too flexible", "Past core competencies become obstacles to new innovation", "Steel is used in manufacturing", "Competitors form cartels"], a: 1 },
            { q: "Absorptive capacity is the ability of a firm to:", options: ["Absorb financial losses", "Recognize the value of new external information, assimilate it, and apply it to commercial ends", "Store excess inventory", "Acquire other companies"], a: 1 },
            { q: "Ambidextrous organizations are capable of:", options: ["Exploiting existing capabilities while exploring new opportunities", "Using both hands", "Only focusing on short-term profits", "Only focusing on radical innovation"], a: 0 },
            { q: "Knowledge management involves:", options: ["Keeping secrets from employees", "Capturing, sharing, and effectively using organizational knowledge", "Deleting old data", "Managing IT hardware"], a: 1 },
            { q: "Tacit knowledge is:", options: ["Found in manuals", "Difficult to articulate or write down, rooted in experience", "Easily transferable", "Available on the internet"], a: 1 },
            { q: "Explicit knowledge is:", options: ["Personal intuition", "Formal, codified, and easily shared (e.g., documents)", "Hidden knowledge", "Only known to the CEO"], a: 1 },
            { q: "A learning curve demonstrates that:", options: ["Learning is impossible", "As cumulative production increases, the cost per unit typically decreases", "Costs increase with experience", "Quality decreases over time"], a: 1 },
            { q: "Innovation ecosystems consist of:", options: ["Only the focal company", "Networks of interdependent organizations (suppliers, partners, customers) that co-create value", "Only technology startups", "Government agencies only"], a: 1 },
            { q: "Skunkworks refers to:", options: ["A failed project", "A small, autonomous group within a larger organization tasked with developing a radical innovation", "A waste management department", "Competitor spying"], a: 1 }
        ],
        "[Strategy] Strategic Management in Social Enterprises": [
            { q: "A social enterprise's primary goal is to:", options: ["Maximize shareholder wealth", "Achieve a social or environmental mission using business methods", "Avoid paying taxes", "Provide free services entirely dependent on donations"], a: 1 },
            { q: "The 'Double Bottom Line' measures:", options: ["Profit and Revenue", "Financial performance and Social impact", "Cost and Quality", "Domestic and International sales"], a: 1 },
            { q: "Social Return on Investment (SROI) is a framework to:", options: ["Calculate stock dividends", "Quantify and monetize the social, environmental, and economic value created", "Measure employee turnover", "Calculate tax liabilities"], a: 1 },
            { q: "A hybrid organization:", options: ["Uses both electricity and gas", "Combines profit-seeking and social-mission motives", "Operates in two countries", "Sells two distinct products"], a: 1 },
            { q: "Mission drift occurs when a social enterprise:", options: ["Expands internationally", "Loses focus on its social mission in pursuit of financial gain", "Changes its name", "Hires a new CEO"], a: 1 },
            { q: "Microfinance institutions primarily provide:", options: ["Large corporate loans", "Small loans to low-income individuals without traditional collateral", "Mortgages for luxury homes", "Investment banking services"], a: 1 },
            { q: "B Corp certification is given to companies that:", options: ["Are bankrupt", "Meet high standards of verified social and environmental performance, transparency, and accountability", "Operate only in the B2B space", "Have a Class B stock structure"], a: 1 },
            { q: "Stakeholder theory is particularly relevant to social enterprises because:", options: ["They only care about shareholders", "They must balance the needs of beneficiaries, funders, and community", "They ignore the government", "They don't have employees"], a: 1 },
            { q: "Impact investing refers to investments made with the intention to:", options: ["Cause market crashes", "Generate positive, measurable social/environmental impact alongside a financial return", "Only maximize financial return", "Avoid all risk"], a: 1 },
            { q: "Scaling a social enterprise involves:", options: ["Increasing its physical weight", "Expanding its impact to reach more beneficiaries", "Reducing the number of employees", "Raising product prices exclusively"], a: 1 }
        ],
        "[Strategy] International Business Strategy": [
            { q: "A 'Born Global' firm is one that:", options: ["Is founded by immigrants", "Seeks to derive significant competitive advantage from international markets right from inception", "Only operates domestically for 50 years before exporting", "Is owned by the UN"], a: 1 },
            { q: "The 'Uppsala Model' of internationalization suggests that firms:", options: ["Enter all markets simultaneously", "Gradually increase international involvement through incremental steps", "Only enter distant markets", "Never enter foreign markets"], a: 1 },
            { q: "Foreign Direct Investment (FDI) involves:", options: ["Exporting goods", "Establishing a physical presence and control in a foreign market", "Licensing a brand name", "Portfolio investment in foreign stocks"], a: 1 },
            { q: "A strategic alliance in international business is:", options: ["A declaration of war", "A cooperative agreement between potential or actual competitors from different countries", "A complete merger of two companies", "Closing foreign operations"], a: 1 },
            { q: "The 'Liability of Foreignness' refers to:", options: ["The cost of international travel", "The inherent disadvantages foreign firms face compared to local firms", "Taxes paid by foreigners", "Language translation costs"], a: 1 },
            { q: "In the integration-responsiveness framework, a 'Global Strategy' emphasizes:", options: ["High local responsiveness, Low cost pressure", "High cost pressure, Low local responsiveness (standardization)", "High cost pressure, High local responsiveness", "Low cost pressure, Low local responsiveness"], a: 1 },
            { q: "A 'Multidomestic Strategy' focuses on:", options: ["Standardizing products globally", "Maximizing local responsiveness by tailoring products to each country", "Centralizing all decisions at HQ", "Ignoring local cultures"], a: 1 },
            { q: "A 'Transnational Strategy' attempts to achieve:", options: ["Only low costs", "Only local responsiveness", "Both high global integration/efficiency and high local responsiveness simultaneously", "Neither efficiency nor responsiveness"], a: 2 },
            { q: "Licensing is an entry mode where:", options: ["A firm sells its entire business", "A firm grants rights to intangible property (like patents/trademarks) to a foreign entity for a fee", "A firm builds a factory abroad", "A firm exports physical goods"], a: 1 },
            { q: "Franchising is similar to licensing but typically involves:", options: ["Manufacturing only", "Stricter control and ongoing assistance in how the business is run", "No fees", "Government ownership"], a: 1 }
        ],
        "[Strategy] Strategic Management of Startups": [
            { q: "A 'Pivot' in a startup refers to:", options: ["Selling the company", "A fundamental change in business strategy or product direction based on feedback", "Hiring a new CEO", "Opening a new office"], a: 1 },
            { q: "The 'Valley of Death' for startups represents:", options: ["A geographic location in Silicon Valley", "The period where a startup has negative cash flow before generating significant revenue", "The end of a product's lifecycle", "A meeting with investors"], a: 1 },
            { q: "A 'Unicorn' in the startup world is:", options: ["A mythical creature", "A privately held startup valued at over $1 billion", "A startup that fails in its first year", "A startup with no competitors"], a: 1 },
            { q: "Product-Market Fit occurs when:", options: ["The product is finally developed", "A company's product strongly satisfies strong market demand", "The market size is calculated", "Competitors copy the product"], a: 1 },
            { q: "A 'Pitch Deck' is used to:", options: ["Build software", "Present the business model and strategy to potential investors", "Manage employee payroll", "Design marketing flyers"], a: 1 },
            { q: "The 'Burn Rate' measures:", options: ["How fast servers overheat", "The rate at which a startup spends its venture capital before generating positive cash flow", "Employee turnover", "Customer churn"], a: 1 },
            { q: "A 'Freemium' business model involves:", options: ["Everything being completely free forever", "Offering a basic version for free while charging for premium features", "Charging high prices initially", "Paying customers to use the product"], a: 1 },
            { q: "Venture Capitalists (VCs) primarily look for startups with:", options: ["Slow, steady, low-risk growth", "Potential for rapid scaling and massive returns (10x+)", "No competitors", "Guaranteed dividends"], a: 1 },
            { q: "An 'Accelerator' program provides startups with:", options: ["Office space only", "Mentorship, capital, and networking in exchange for equity over a short period", "Government grants", "Bank loans"], a: 1 },
            { q: "An 'Exit Strategy' for founders and investors typically involves:", options: ["Closing the business", "An IPO (Initial Public Offering) or Acquisition by a larger company", "Firing employees", "Changing the product name"], a: 1 }
        ],
        "[Strategy] Strategic Innovation in Health Care and Education": [
            { q: "Telemedicine is a strategic innovation that:", options: ["Requires physical hospital visits", "Delivers clinical health care services remotely via technology", "Only prescribes medicine", "Replaces all doctors with AI"], a: 1 },
            { q: "Value-based healthcare models focus on reimbursing providers based on:", options: ["The number of procedures performed (fee-for-service)", "Patient health outcomes and quality of care", "The time spent with the patient", "The cost of equipment"], a: 1 },
            { q: "MOOCs in education stand for:", options: ["Massive Open Online Courses", "Modern Office Organization Concepts", "Medical Online Operations Center", "Multiple Option Online Classes"], a: 0 },
            { q: "Flipped Classroom is an educational innovation where:", options: ["Desks are turned around", "Instructional content is consumed at home, and class time is used for interactive activities/problem-solving", "Teachers become students", "All classes are held outdoors"], a: 1 },
            { q: "Electronic Health Records (EHRs) improve healthcare strategy by:", options: ["Increasing paperwork", "Facilitating data sharing, improving care coordination, and reducing errors", "Making healthcare more expensive", "Replacing nurses"], a: 1 },
            { q: "Adaptive Learning platforms use AI to:", options: ["Grade multiple choice tests", "Personalize the learning path and pace for individual students", "Monitor attendance", "Design school buildings"], a: 1 },
            { q: "A major strategic challenge in healthcare innovation is:", options: ["Lack of patients", "Navigating strict regulatory environments (like HIPAA) and data privacy concerns", "Too many doctors", "Lack of diseases"], a: 1 },
            { q: "EdTech refers to:", options: ["Education techniques", "The combined use of computer hardware, software, and educational theory to facilitate learning", "Educational testing", "Only online universities"], a: 1 },
            { q: "Preventative healthcare strategy shifts focus from:", options: ["Treatment to wellness and early detection", "Hospitals to clinics", "Doctors to nurses", "Insurance to self-pay"], a: 0 },
            { q: "Gamification in education is the strategy of:", options: ["Playing video games instead of studying", "Applying game-design elements (like points, badges) in learning environments to increase engagement", "Designing games", "Making tests easier"], a: 1 }
        ]
`;

const file = 'C:\\Users\\Toshiba\\OneDrive\\Desktop\\solmates\\frontend\\games\\quiz-battle\\data.js';
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd();
content = content.substring(0, content.lastIndexOf("};"));
let newContent = content + ",\n" + textToAppend + "\n    }\n};\n";
fs.writeFileSync(file, newContent, 'utf8');
console.log('Appended final batch successfully');
