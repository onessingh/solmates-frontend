const QUIZ_DATA = {
    "courses": [
        "MBA"
    ],
    "structure": {
        "MBA": {
            "Semester 1": [
                "Organisational Behavior",
                "Data Analysis and Decision Tools",
                "Managerial Economics",
                "Accounting for Managers",
                "Marketing Management",
                "Human Resource Management",
                "Business Communication",
                "Information Technology Management"
            ],
            "Semester 2": [
                "Organisation Effectiveness and Change",
                "Decision Modelling and Optimisation",
                "Economic Environment of Business",
                "Corporate Finance",
                "Management Accounting",
                "Production and Operations Management",
                "Marketing Research",
                "Management of Information Systems"
            ],
            "Semester 3": [
                "[Core] Business Ethics and Sustainability",
                "[Core] Strategic Analysis",
                "[Core] Entrepreneurship, Creativity and Innovation",
                "[Finance] Security Analysis and Portfolio Management",
                "[Finance] International Financial Management",
                "[Finance] Financial Derivatives",
                "[Finance] Financial Markets and Institutions",
                "[Finance] Mergers and Corporate Restructuring",
                "[Marketing] Consumer Behavior",
                "[Marketing] Advertising Management",
                "[Marketing] Services Marketing",
                "[Marketing] Brand Management",
                "[Marketing] Digital Marketing",
                "[OB & HRM] Performance Management and Training Intervention",
                "[OB & HRM] Compensation and Rewards Management",
                "[OB & HRM] Human Resource Development: Strategies and Systems",
                "[OB & HRM] Cross Cultural and Global Management",
                "[OB & HRM] Leadership, Power and Politics"
            ],
            "Semester 4": [
                "[Core] Legal Environment of Business",
                "[Core] Strategic Management",
                "[Core] Global Business Management",
                "[Finance] Quantitative Analysis of Financial Decisions",
                "[Finance] Merchant Banking and Financial Services",
                "[Finance] Financial Risk Management",
                "[Finance] Fixed Income Securities",
                "[Finance] Financial Reporting",
                "[Marketing] Competitive Marketing",
                "[Marketing] Business Marketing",
                "[Marketing] Sales Force Management",
                "[Marketing] Marketing Analytics",
                "[Marketing] Rural Marketing",
                "[OB & HRM] Human Resource Metrics and Analytics",
                "[OB & HRM] Managing Interpersonal and Group Processes",
                "[OB & HRM] Counseling Skills for Managers",
                "[OB & HRM] Management of Industrial Relations",
                "[OB & HRM] Negotiation and Influence Skills",
                "[Operations] Operations Strategy",
                "[Operations] Technology, Innovation and New Product Management",
                "[Operations] System Optimization and Management Science",
                "[Operations] Supply Chain Analytics",
                "[Operations] Supply Chain Management",
                "[Strategy] Strategic Capability Building and Innovation",
                "[Strategy] Strategic Management in Social Enterprises",
                "[Strategy] International Business Strategy",
                "[Strategy] Strategic Management of Startups",
                "[Strategy] Strategic Innovation in Health Care and Education"
            ]
        }
    },
    "questionBank": {
        "Organisational Behavior": [
            {
                "word": "MOTIVATION",
                "hint": "Inner drive to take action"
            },
            {
                "word": "LEADERSHIP",
                "hint": "Guiding others toward a goal"
            },
            {
                "word": "PERCEPTION",
                "hint": "How we interpret the world around us"
            },
            {
                "word": "DELEGATION",
                "hint": "Assigning tasks to subordinates"
            },
            {
                "word": "SYNERGY",
                "hint": "Combined effect greater than the sum of parts"
            }
        ],
        "Data Analysis and Decision Tools": [
            {
                "word": "REGRESSION",
                "hint": "Statistical method to predict outcomes"
            },
            {
                "word": "VARIANCE",
                "hint": "Spread of data from its mean"
            },
            {
                "word": "HYPOTHESIS",
                "hint": "Proposed explanation tested through research"
            },
            {
                "word": "PROBABILITY",
                "hint": "Likelihood of an event occurring"
            },
            {
                "word": "CORRELATION",
                "hint": "Statistical relationship between two variables"
            }
        ],
        "Managerial Economics": [
            {
                "word": "ELASTICITY",
                "hint": "Responsiveness of demand to price change"
            },
            {
                "word": "MONOPOLY",
                "hint": "Single seller controls the market"
            },
            {
                "word": "OLIGOPOLY",
                "hint": "Few large sellers dominate the market"
            },
            {
                "word": "UTILITY",
                "hint": "Satisfaction derived from consuming a good"
            },
            {
                "word": "OPPORTUNITY COST",
                "hint": "Value of the best foregone alternative"
            }
        ],
        "Accounting for Managers": [
            {
                "word": "DEPRECIATION",
                "hint": "Reduction in asset value over time"
            },
            {
                "word": "LIQUIDITY",
                "hint": "Ease of converting assets to cash"
            },
            {
                "word": "AMORTIZATION",
                "hint": "Gradually writing off an intangible asset"
            },
            {
                "word": "LEDGER",
                "hint": "Book of financial accounts"
            },
            {
                "word": "EQUITY",
                "hint": "Owner's residual interest in the company"
            }
        ],
        "Marketing Management": [
            {
                "word": "SEGMENTATION",
                "hint": "Dividing market into distinct groups"
            },
            {
                "word": "POSITIONING",
                "hint": "Creating a distinct image in customers' minds"
            },
            {
                "word": "BRANDING",
                "hint": "Creating a unique identity for a product"
            },
            {
                "word": "DEMOGRAPHICS",
                "hint": "Statistical study of a population"
            },
            {
                "word": "PROMOTION",
                "hint": "Communicating value to the market"
            }
        ],
        "Human Resource Management": [
            {
                "word": "RECRUITMENT",
                "hint": "Attracting candidates for job openings"
            },
            {
                "word": "ONBOARDING",
                "hint": "Integrating new employees into the organization"
            },
            {
                "word": "APPRAISAL",
                "hint": "Formal evaluation of employee performance"
            },
            {
                "word": "RETENTION",
                "hint": "Keeping valuable employees in the organization"
            },
            {
                "word": "COMPENSATION",
                "hint": "Total pay and benefits given to an employee"
            }
        ],
        "Business Communication": [
            {
                "word": "PERSUASION",
                "hint": "Convincing others to change their view"
            },
            {
                "word": "NEGOTIATION",
                "hint": "Reaching a mutually acceptable agreement"
            },
            {
                "word": "FEEDBACK",
                "hint": "Response given to a sender after receiving a message"
            },
            {
                "word": "GRAPEVINE",
                "hint": "Informal channel of communication"
            },
            {
                "word": "MEMORANDUM",
                "hint": "Written internal business communication"
            }
        ],
        "Information Technology Management": [
            {
                "word": "FIREWALL",
                "hint": "Security system that monitors network traffic"
            },
            {
                "word": "DATABASE",
                "hint": "Organized collection of structured data"
            },
            {
                "word": "ENCRYPTION",
                "hint": "Converting data into a coded format"
            },
            {
                "word": "BANDWIDTH",
                "hint": "Maximum data transfer rate of a network"
            },
            {
                "word": "ALGORITHM",
                "hint": "Step-by-step procedure for solving a problem"
            }
        ],
        "Organisation Effectiveness and Change": [
            {
                "word": "REENGINEERING",
                "hint": "Redesigning business processes from scratch"
            },
            {
                "word": "BENCHMARKING",
                "hint": "Comparing with best-in-class standards"
            },
            {
                "word": "CULTURE",
                "hint": "Shared values and norms of an organization"
            },
            {
                "word": "EMPOWERMENT",
                "hint": "Giving employees authority to make decisions"
            },
            {
                "word": "TRANSFORMATION",
                "hint": "Radical change in an organization"
            }
        ],
        "Decision Modelling and Optimisation": [
            {
                "word": "SIMULATION",
                "hint": "Imitating a real-world process or system"
            },
            {
                "word": "SENSITIVITY",
                "hint": "Analysis of how output changes with input variation"
            },
            {
                "word": "OPTIMIZATION",
                "hint": "Finding the best solution from all feasible solutions"
            },
            {
                "word": "CONSTRAINT",
                "hint": "A limitation on available resources"
            },
            {
                "word": "OBJECTIVE",
                "hint": "The goal to be maximized or minimized"
            }
        ],
        "Economic Environment of Business": [
            {
                "word": "INFLATION",
                "hint": "General rise in prices over time"
            },
            {
                "word": "RECESSION",
                "hint": "Period of significant economic decline"
            },
            {
                "word": "FISCAL POLICY",
                "hint": "Government spending and taxation decisions"
            },
            {
                "word": "MONETARY POLICY",
                "hint": "Central bank control of money supply"
            },
            {
                "word": "GLOBALIZATION",
                "hint": "Integration of world economies and markets"
            }
        ],
        "Corporate Finance": [
            {
                "word": "DIVIDEND",
                "hint": "Share of company profits paid to shareholders"
            },
            {
                "word": "LEVERAGE",
                "hint": "Using borrowed capital to amplify returns"
            },
            {
                "word": "PORTFOLIO",
                "hint": "Collection of financial investments"
            },
            {
                "word": "BOND",
                "hint": "Debt instrument issued by corporations or governments"
            },
            {
                "word": "ARBITRAGE",
                "hint": "Profiting from price differences in different markets"
            }
        ],
        "Management Accounting": [
            {
                "word": "BUDGETING",
                "hint": "Planning future financial activities"
            },
            {
                "word": "COSTING",
                "hint": "Determining the cost of a product or service"
            },
            {
                "word": "VARIANCE",
                "hint": "Difference between actual and standard cost"
            },
            {
                "word": "OVERHEAD",
                "hint": "Indirect costs of running a business"
            },
            {
                "word": "BREAKEVEN",
                "hint": "Point where revenue equals total costs"
            }
        ],
        "Production and Operations Management": [
            {
                "word": "INVENTORY",
                "hint": "Stock of goods held by a business"
            },
            {
                "word": "LOGISTICS",
                "hint": "Planning and managing supply and delivery"
            },
            {
                "word": "BOTTLENECK",
                "hint": "Process step that limits overall throughput"
            },
            {
                "word": "CAPACITY",
                "hint": "Maximum output a system can produce"
            },
            {
                "word": "SCHEDULING",
                "hint": "Allocating time to tasks or resources"
            }
        ],
        "Marketing Research": [
            {
                "word": "SAMPLING",
                "hint": "Selecting a subset of a population for study"
            },
            {
                "word": "QUESTIONNAIRE",
                "hint": "Structured set of questions for data collection"
            },
            {
                "word": "ETHNOGRAPHY",
                "hint": "Studying customers in their natural environment"
            },
            {
                "word": "FOCUS GROUP",
                "hint": "Small group discussion for qualitative research"
            },
            {
                "word": "INSIGHT",
                "hint": "Deep understanding of customer behavior"
            }
        ],
        "Management of Information Systems": [
            {
                "word": "ERP",
                "hint": "Enterprise Resource Planning system"
            },
            {
                "word": "CLOUD COMPUTING",
                "hint": "Delivering computing services over the internet"
            },
            {
                "word": "CYBERSECURITY",
                "hint": "Protecting systems from digital attacks"
            },
            {
                "word": "DATA MINING",
                "hint": "Discovering patterns in large datasets"
            },
            {
                "word": "INTEGRATION",
                "hint": "Combining different systems into one unified system"
            }
        ],
        "[Core] Business Ethics and Sustainability": [
            {
                "word": "INTEGRITY",
                "hint": "Being honest and having strong moral principles"
            },
            {
                "word": "SUSTAINABILITY",
                "hint": "Meeting current needs without compromising future generations"
            },
            {
                "word": "WHISTLEBLOWING",
                "hint": "Reporting unethical activity within an organization"
            },
            {
                "word": "GOVERNANCE",
                "hint": "System of rules and practices directing a company"
            },
            {
                "word": "STAKEHOLDER",
                "hint": "Any party with an interest in a company"
            }
        ],
        "[Core] Strategic Analysis": [
            {
                "word": "SWOT",
                "hint": "Strengths, Weaknesses, Opportunities, Threats framework"
            },
            {
                "word": "PESTLE",
                "hint": "Macro-environment analysis framework"
            },
            {
                "word": "BENCHMARKING",
                "hint": "Comparing with best practices in the industry"
            },
            {
                "word": "FIVE FORCES",
                "hint": "Porter's model for industry competition analysis"
            },
            {
                "word": "CORE COMPETENCE",
                "hint": "Unique capability that gives competitive advantage"
            }
        ],
        "[Core] Entrepreneurship, Creativity and Innovation": [
            {
                "word": "BOOTSTRAPPING",
                "hint": "Starting a business without external funding"
            },
            {
                "word": "PIVOT",
                "hint": "Changing business strategy based on market feedback"
            },
            {
                "word": "PROTOTYPE",
                "hint": "Early model of a product for testing"
            },
            {
                "word": "DISRUPTION",
                "hint": "Innovation that significantly changes an industry"
            },
            {
                "word": "INCUBATOR",
                "hint": "Organization that helps startups grow"
            }
        ],
        "[Finance] Security Analysis and Portfolio Management": [
            {
                "word": "BETA",
                "hint": "Measure of a stock's volatility relative to market"
            },
            {
                "word": "YIELD",
                "hint": "Earnings generated on an investment"
            },
            {
                "word": "DIVERSIFICATION",
                "hint": "Spreading investments to reduce risk"
            },
            {
                "word": "VALUATION",
                "hint": "Process of determining the current worth of an asset"
            },
            {
                "word": "ARBITRAGE",
                "hint": "Exploiting price differences between markets"
            }
        ],
        "[Finance] International Financial Management": [
            {
                "word": "HEDGING",
                "hint": "Reducing risk through offsetting positions"
            },
            {
                "word": "EXCHANGE RATE",
                "hint": "Rate at which one currency is exchanged for another"
            },
            {
                "word": "REPATRIATION",
                "hint": "Sending profits back to the home country"
            },
            {
                "word": "TRANSFER PRICING",
                "hint": "Pricing of transactions between related entities"
            },
            {
                "word": "FOREX",
                "hint": "Foreign exchange market"
            }
        ],
        "[Finance] Financial Derivatives": [
            {
                "word": "OPTION",
                "hint": "Right but not obligation to buy/sell an asset"
            },
            {
                "word": "FUTURES",
                "hint": "Agreement to buy/sell at a future date and price"
            },
            {
                "word": "SWAP",
                "hint": "Exchange of cash flows between two parties"
            },
            {
                "word": "HEDGING",
                "hint": "Using derivatives to offset potential losses"
            },
            {
                "word": "PREMIUM",
                "hint": "Price paid for an options contract"
            }
        ],
        "[Finance] Financial Markets and Institutions": [
            {
                "word": "LIQUIDITY",
                "hint": "Ease with which an asset can be converted to cash"
            },
            {
                "word": "DEBENTURE",
                "hint": "Long-term unsecured debt instrument"
            },
            {
                "word": "MUTUAL FUND",
                "hint": "Pooled investment vehicle managed by professionals"
            },
            {
                "word": "REPO RATE",
                "hint": "Rate at which central bank lends to commercial banks"
            },
            {
                "word": "SECURITIES",
                "hint": "Financial instruments that hold monetary value"
            }
        ],
        "[Finance] Mergers and Corporate Restructuring": [
            {
                "word": "ACQUISITION",
                "hint": "One company purchasing another"
            },
            {
                "word": "SYNERGY",
                "hint": "Combined value greater than individual parts"
            },
            {
                "word": "DUE DILIGENCE",
                "hint": "Investigation before a business transaction"
            },
            {
                "word": "SPIN OFF",
                "hint": "Creating a new independent company from a parent"
            },
            {
                "word": "LEVERAGE BUYOUT",
                "hint": "Acquiring a company using significant borrowed money"
            }
        ],
        "[Marketing] Consumer Behavior": [
            {
                "word": "PERCEPTION",
                "hint": "How consumers interpret marketing stimuli"
            },
            {
                "word": "ATTITUDE",
                "hint": "Predisposition to respond to something favorably or unfavorably"
            },
            {
                "word": "MOTIVATION",
                "hint": "Internal state that drives consumer behavior"
            },
            {
                "word": "INVOLVEMENT",
                "hint": "Degree of personal relevance a product has"
            },
            {
                "word": "REFERENCE GROUP",
                "hint": "Group that influences an individual's attitudes"
            }
        ],
        "[Marketing] Advertising Management": [
            {
                "word": "COPYWRITING",
                "hint": "Creating persuasive text for advertisements"
            },
            {
                "word": "REACH",
                "hint": "Number of unique people exposed to an ad"
            },
            {
                "word": "FREQUENCY",
                "hint": "Number of times an audience sees an ad"
            },
            {
                "word": "ENDORSEMENT",
                "hint": "Using celebrities to promote products"
            },
            {
                "word": "JINGLE",
                "hint": "Short song used in advertising"
            }
        ],
        "[Marketing] Services Marketing": [
            {
                "word": "INTANGIBILITY",
                "hint": "Services cannot be seen or touched before purchase"
            },
            {
                "word": "PERISHABILITY",
                "hint": "Services cannot be stored for future use"
            },
            {
                "word": "SERVICESCAPE",
                "hint": "Physical environment where service is delivered"
            },
            {
                "word": "BLUEPRINTING",
                "hint": "Mapping the service delivery process visually"
            },
            {
                "word": "HETEROGENEITY",
                "hint": "Variability in service quality and delivery"
            }
        ],
        "[Marketing] Brand Management": [
            {
                "word": "BRAND EQUITY",
                "hint": "Commercial value derived from consumer perception"
            },
            {
                "word": "POSITIONING",
                "hint": "How a brand is perceived relative to competitors"
            },
            {
                "word": "EXTENSION",
                "hint": "Using an existing brand name for a new product"
            },
            {
                "word": "IDENTITY",
                "hint": "Visual and verbal elements that represent the brand"
            },
            {
                "word": "LOYALTY",
                "hint": "Consistent preference for one brand over others"
            }
        ],
        "[Marketing] Digital Marketing": [
            {
                "word": "SEO",
                "hint": "Optimizing content to rank higher in search results"
            },
            {
                "word": "CONVERSION",
                "hint": "Turning a visitor into a customer"
            },
            {
                "word": "ENGAGEMENT",
                "hint": "Interaction of users with content"
            },
            {
                "word": "INFLUENCER",
                "hint": "Person with power to affect purchasing decisions online"
            },
            {
                "word": "ANALYTICS",
                "hint": "Analysis of data to understand online behavior"
            }
        ],
        "[OB & HRM] Performance Management and Training Intervention": [
            {
                "word": "APPRAISAL",
                "hint": "Formal assessment of employee performance"
            },
            {
                "word": "MENTORING",
                "hint": "Experienced person guiding a less experienced one"
            },
            {
                "word": "COACHING",
                "hint": "Improving skills through practice and feedback"
            },
            {
                "word": "KPI",
                "hint": "Key Performance Indicator - measure of success"
            },
            {
                "word": "CALIBRATION",
                "hint": "Standardizing performance ratings across teams"
            }
        ],
        "[OB & HRM] Compensation and Rewards Management": [
            {
                "word": "INCENTIVE",
                "hint": "Reward designed to motivate behavior"
            },
            {
                "word": "BONUS",
                "hint": "Extra payment beyond base salary"
            },
            {
                "word": "BENEFITS",
                "hint": "Non-wage compensation like health insurance"
            },
            {
                "word": "PAY EQUITY",
                "hint": "Fair and equal pay for equal work"
            },
            {
                "word": "RECOGNITION",
                "hint": "Acknowledging employee achievements formally"
            }
        ],
        "[OB & HRM] Human Resource Development: Strategies and Systems": [
            {
                "word": "SUCCESSION",
                "hint": "Planning for future leadership transitions"
            },
            {
                "word": "COMPETENCY",
                "hint": "Skill or ability required for a role"
            },
            {
                "word": "TALENT POOL",
                "hint": "Group of employees ready for advancement"
            },
            {
                "word": "UPSKILLING",
                "hint": "Learning new skills to improve performance"
            },
            {
                "word": "RESKILLING",
                "hint": "Learning new skills for a different role"
            }
        ],
        "[OB & HRM] Cross Cultural and Global Management": [
            {
                "word": "HOFSTEDE",
                "hint": "Researcher who identified cultural dimensions"
            },
            {
                "word": "EXPATRIATE",
                "hint": "Employee living and working in a foreign country"
            },
            {
                "word": "ETHNOCENTRISM",
                "hint": "Belief that one's own culture is superior"
            },
            {
                "word": "ACCULTURATION",
                "hint": "Adopting elements of another culture"
            },
            {
                "word": "DIVERSITY",
                "hint": "Variety of cultural and personal backgrounds"
            }
        ],
        "[OB & HRM] Leadership, Power and Politics": [
            {
                "word": "CHARISMA",
                "hint": "Compelling attractiveness inspiring devotion in others"
            },
            {
                "word": "INFLUENCE",
                "hint": "Capacity to have an effect on others"
            },
            {
                "word": "AUTHORITY",
                "hint": "Right to give orders and make decisions"
            },
            {
                "word": "COALITION",
                "hint": "Alliance of groups for a shared goal"
            },
            {
                "word": "EMPOWERMENT",
                "hint": "Giving others authority to make decisions"
            }
        ],
        "[Core] Legal Environment of Business": [
            {
                "word": "NEGLIGENCE",
                "hint": "Failure to take proper care in doing something"
            },
            {
                "word": "LIABILITY",
                "hint": "Legal responsibility for one's actions"
            },
            {
                "word": "CONTRACT",
                "hint": "Legally binding agreement between parties"
            },
            {
                "word": "ARBITRATION",
                "hint": "Out-of-court dispute resolution process"
            },
            {
                "word": "INTELLECTUAL PROPERTY",
                "hint": "Creations of the mind protected by law"
            }
        ],
        "[Core] Strategic Management": [
            {
                "word": "COMPETITIVE ADVANTAGE",
                "hint": "Edge over rivals that allows superior returns"
            },
            {
                "word": "DIVERSIFICATION",
                "hint": "Expanding into new markets or products"
            },
            {
                "word": "VALUE CHAIN",
                "hint": "Activities that create value for customers"
            },
            {
                "word": "BLUE OCEAN",
                "hint": "Uncontested market space with no competition"
            },
            {
                "word": "ACQUISITION",
                "hint": "Purchasing another company to grow"
            }
        ],
        "[Core] Global Business Management": [
            {
                "word": "OUTSOURCING",
                "hint": "Hiring external parties for business functions"
            },
            {
                "word": "OFFSHORING",
                "hint": "Moving business operations to another country"
            },
            {
                "word": "JOINT VENTURE",
                "hint": "Business created by two or more parties together"
            },
            {
                "word": "TARIFF",
                "hint": "Tax imposed on imported goods"
            },
            {
                "word": "SUBSIDIARY",
                "hint": "Company owned or controlled by a parent company"
            }
        ],
        "[Finance] Quantitative Analysis of Financial Decisions": [
            {
                "word": "NPV",
                "hint": "Net Present Value of future cash flows"
            },
            {
                "word": "IRR",
                "hint": "Internal Rate of Return on investment"
            },
            {
                "word": "PAYBACK PERIOD",
                "hint": "Time to recover initial investment"
            },
            {
                "word": "ANNUITY",
                "hint": "Series of equal payments at regular intervals"
            },
            {
                "word": "DISCOUNTING",
                "hint": "Reducing future value to present value"
            }
        ],
        "[Finance] Merchant Banking and Financial Services": [
            {
                "word": "UNDERWRITING",
                "hint": "Guaranteeing payment in case of financial loss"
            },
            {
                "word": "IPO",
                "hint": "Initial Public Offering of a company's shares"
            },
            {
                "word": "DUE DILIGENCE",
                "hint": "Thorough investigation before a business deal"
            },
            {
                "word": "PROSPECTUS",
                "hint": "Document inviting public to buy company shares"
            },
            {
                "word": "SYNDICATION",
                "hint": "Group of banks jointly underwriting a deal"
            }
        ],
        "[Finance] Financial Risk Management": [
            {
                "word": "CREDIT RISK",
                "hint": "Risk of borrower defaulting on a loan"
            },
            {
                "word": "MARKET RISK",
                "hint": "Risk from changes in market prices"
            },
            {
                "word": "LIQUIDITY RISK",
                "hint": "Risk of inability to meet short-term obligations"
            },
            {
                "word": "HEDGING",
                "hint": "Protecting against financial risk using derivatives"
            },
            {
                "word": "VaR",
                "hint": "Value at Risk - maximum likely loss"
            }
        ],
        "[Finance] Fixed Income Securities": [
            {
                "word": "COUPON",
                "hint": "Periodic interest payment on a bond"
            },
            {
                "word": "MATURITY",
                "hint": "Date on which a bond's principal is repaid"
            },
            {
                "word": "YIELD",
                "hint": "Return on a bond investment"
            },
            {
                "word": "DURATION",
                "hint": "Measure of a bond's sensitivity to interest rates"
            },
            {
                "word": "DEBENTURE",
                "hint": "Unsecured long-term debt instrument"
            }
        ],
        "[Finance] Financial Reporting": [
            {
                "word": "BALANCE SHEET",
                "hint": "Snapshot of company's assets and liabilities"
            },
            {
                "word": "CASH FLOW",
                "hint": "Movement of money in and out of business"
            },
            {
                "word": "AUDIT",
                "hint": "Independent examination of financial records"
            },
            {
                "word": "DISCLOSURE",
                "hint": "Required sharing of financial information"
            },
            {
                "word": "GOODWILL",
                "hint": "Intangible asset from business acquisition"
            }
        ],
        "[Marketing] Competitive Marketing": [
            {
                "word": "DIFFERENTIATION",
                "hint": "Making a product distinct from competitors"
            },
            {
                "word": "MARKET SHARE",
                "hint": "Percentage of sales held in an industry"
            },
            {
                "word": "BENCHMARKING",
                "hint": "Comparing with the best in the industry"
            },
            {
                "word": "PENETRATION",
                "hint": "Strategy of entering market with low prices"
            },
            {
                "word": "COMPETITIVE ADVANTAGE",
                "hint": "Factor that puts a company ahead of rivals"
            }
        ],
        "[Marketing] Business Marketing": [
            {
                "word": "B2B",
                "hint": "Business to Business marketing"
            },
            {
                "word": "RFP",
                "hint": "Request for Proposal in business procurement"
            },
            {
                "word": "KEY ACCOUNT",
                "hint": "Most important client in a business relationship"
            },
            {
                "word": "SUPPLY CHAIN",
                "hint": "System of organizations involved in product delivery"
            },
            {
                "word": "TENDER",
                "hint": "Formal offer to supply goods at a stated price"
            }
        ],
        "[Marketing] Sales Force Management": [
            {
                "word": "QUOTA",
                "hint": "Sales target assigned to a salesperson"
            },
            {
                "word": "TERRITORY",
                "hint": "Defined geographic area assigned to a sales rep"
            },
            {
                "word": "PIPELINE",
                "hint": "Stages a prospect goes through before purchase"
            },
            {
                "word": "COMMISSION",
                "hint": "Pay based on percentage of sales achieved"
            },
            {
                "word": "CRM",
                "hint": "Customer Relationship Management system"
            }
        ],
        "[Marketing] Marketing Analytics": [
            {
                "word": "ATTRIBUTION",
                "hint": "Crediting marketing channels for conversions"
            },
            {
                "word": "CHURN RATE",
                "hint": "Rate at which customers stop buying"
            },
            {
                "word": "FUNNEL",
                "hint": "Stages from awareness to purchase"
            },
            {
                "word": "SEGMENTATION",
                "hint": "Dividing audience into meaningful groups"
            },
            {
                "word": "ROI",
                "hint": "Return on Investment from marketing spend"
            }
        ],
        "[Marketing] Rural Marketing": [
            {
                "word": "HAATS",
                "hint": "Traditional weekly rural markets in India"
            },
            {
                "word": "SACHET",
                "hint": "Small single-use packs for rural affordability"
            },
            {
                "word": "MANDI",
                "hint": "Agricultural produce market"
            },
            {
                "word": "MICROFINANCE",
                "hint": "Small loans to low-income individuals"
            },
            {
                "word": "COOPERATIVE",
                "hint": "Jointly owned enterprise benefiting members"
            }
        ],
        "[OB & HRM] Human Resource Metrics and Analytics": [
            {
                "word": "ATTRITION",
                "hint": "Rate at which employees leave an organization"
            },
            {
                "word": "HEADCOUNT",
                "hint": "Total number of employees in an organization"
            },
            {
                "word": "ABSENTEEISM",
                "hint": "Habitual absence from work"
            },
            {
                "word": "PRODUCTIVITY",
                "hint": "Output per unit of input"
            },
            {
                "word": "ENGAGEMENT SCORE",
                "hint": "Measure of employee commitment to organization"
            }
        ],
        "[OB & HRM] Managing Interpersonal and Group Processes": [
            {
                "word": "COHESION",
                "hint": "Degree of unity within a group"
            },
            {
                "word": "GROUPTHINK",
                "hint": "Desire for harmony overrides realistic appraisal"
            },
            {
                "word": "CONFLICT",
                "hint": "Struggle between incompatible goals"
            },
            {
                "word": "SYNERGY",
                "hint": "Collective output greater than individual contributions"
            },
            {
                "word": "TEAM DYNAMICS",
                "hint": "Behavioral patterns within a team"
            }
        ],
        "[OB & HRM] Counseling Skills for Managers": [
            {
                "word": "EMPATHY",
                "hint": "Understanding and sharing feelings of another"
            },
            {
                "word": "ACTIVE LISTENING",
                "hint": "Fully concentrating on what is being said"
            },
            {
                "word": "RAPPORT",
                "hint": "Close relationship of mutual trust"
            },
            {
                "word": "CONFIDENTIALITY",
                "hint": "Keeping shared information private"
            },
            {
                "word": "INTERVENTION",
                "hint": "Planned approach to address a problem"
            }
        ],
        "[OB & HRM] Management of Industrial Relations": [
            {
                "word": "COLLECTIVE BARGAINING",
                "hint": "Negotiation between employer and trade union"
            },
            {
                "word": "LOCKOUT",
                "hint": "Employer action preventing workers from working"
            },
            {
                "word": "ARBITRATION",
                "hint": "Third party resolves dispute between parties"
            },
            {
                "word": "GRIEVANCE",
                "hint": "Formal complaint by an employee"
            },
            {
                "word": "UNION",
                "hint": "Organization of workers for collective action"
            }
        ],
        "[OB & HRM] Negotiation and Influence Skills": [
            {
                "word": "BATNA",
                "hint": "Best Alternative to a Negotiated Agreement"
            },
            {
                "word": "PERSUASION",
                "hint": "Convincing others to adopt your viewpoint"
            },
            {
                "word": "CONCESSION",
                "hint": "Giving up something in a negotiation"
            },
            {
                "word": "LEVERAGE",
                "hint": "Advantage that strengthens your position"
            },
            {
                "word": "WIN WIN",
                "hint": "Outcome beneficial to all parties in negotiation"
            }
        ],
        "[Operations] Operations Strategy": [
            {
                "word": "LEAN",
                "hint": "Eliminating waste to improve efficiency"
            },
            {
                "word": "SIX SIGMA",
                "hint": "Data-driven approach to reducing defects"
            },
            {
                "word": "OUTSOURCING",
                "hint": "Contracting a function to external provider"
            },
            {
                "word": "VERTICAL INTEGRATION",
                "hint": "Controlling supply chain stages internally"
            },
            {
                "word": "THROUGHPUT",
                "hint": "Rate at which system produces output"
            }
        ],
        "[Operations] Technology, Innovation and New Product Management": [
            {
                "word": "PROTOTYPE",
                "hint": "Early model of product used for testing"
            },
            {
                "word": "AGILE",
                "hint": "Iterative approach to product development"
            },
            {
                "word": "DISRUPTION",
                "hint": "Innovation that fundamentally changes an industry"
            },
            {
                "word": "PATENT",
                "hint": "Exclusive right granted for an invention"
            },
            {
                "word": "R&D",
                "hint": "Research and Development activities"
            }
        ],
        "[Operations] System Optimization and Management Science": [
            {
                "word": "LINEAR PROGRAMMING",
                "hint": "Mathematical method for optimizing outcomes"
            },
            {
                "word": "QUEUING THEORY",
                "hint": "Study of waiting lines in processes"
            },
            {
                "word": "SIMULATION",
                "hint": "Modeling a system to predict its behavior"
            },
            {
                "word": "SENSITIVITY ANALYSIS",
                "hint": "Studying effect of parameter changes on output"
            },
            {
                "word": "FEASIBILITY",
                "hint": "Whether a solution satisfies all constraints"
            }
        ],
        "[Operations] Supply Chain Analytics": [
            {
                "word": "FORECASTING",
                "hint": "Predicting future demand for planning"
            },
            {
                "word": "DEMAND PLANNING",
                "hint": "Estimating future product needs"
            },
            {
                "word": "BULLWHIP EFFECT",
                "hint": "Amplification of demand variability upstream"
            },
            {
                "word": "SAFETY STOCK",
                "hint": "Extra inventory to prevent stockouts"
            },
            {
                "word": "LEAD TIME",
                "hint": "Time from order to delivery"
            }
        ],
        "[Operations] Supply Chain Management": [
            {
                "word": "PROCUREMENT",
                "hint": "Process of obtaining goods or services"
            },
            {
                "word": "WAREHOUSING",
                "hint": "Storing goods before distribution"
            },
            {
                "word": "DISTRIBUTION",
                "hint": "Delivering products to end customers"
            },
            {
                "word": "VENDOR",
                "hint": "Supplier of goods or services"
            },
            {
                "word": "JIT",
                "hint": "Just In Time - inventory delivered when needed"
            }
        ],
        "[Strategy] Strategic Capability Building and Innovation": [
            {
                "word": "CAPABILITY",
                "hint": "Ability to perform activities that create value"
            },
            {
                "word": "AMBIDEXTERITY",
                "hint": "Ability to exploit existing and explore new opportunities"
            },
            {
                "word": "PLATFORM",
                "hint": "Business model connecting multiple user groups"
            },
            {
                "word": "ECOSYSTEM",
                "hint": "Network of organizations creating value together"
            },
            {
                "word": "RESILIENCE",
                "hint": "Ability to recover from disruptions"
            }
        ],
        "[Strategy] Strategic Management in Social Enterprises": [
            {
                "word": "SOCIAL IMPACT",
                "hint": "Effect of an organization's actions on communities"
            },
            {
                "word": "NGO",
                "hint": "Non-Governmental Organization"
            },
            {
                "word": "MICROFINANCE",
                "hint": "Financial services to low-income individuals"
            },
            {
                "word": "CSR",
                "hint": "Corporate Social Responsibility"
            },
            {
                "word": "TRIPLE BOTTOM LINE",
                "hint": "People, Planet, Profit framework"
            }
        ],
        "[Strategy] International Business Strategy": [
            {
                "word": "LOCALIZATION",
                "hint": "Adapting products for local markets"
            },
            {
                "word": "GLOCALIZATION",
                "hint": "Thinking globally acting locally"
            },
            {
                "word": "MARKET ENTRY",
                "hint": "Strategy for entering a new foreign market"
            },
            {
                "word": "JOINT VENTURE",
                "hint": "Partnership between companies from different countries"
            },
            {
                "word": "COMPETITIVE ADVANTAGE",
                "hint": "Unique strength that enables market leadership"
            }
        ],
        "[Strategy] Strategic Management of Startups": [
            {
                "word": "BOOTSTRAPPING",
                "hint": "Growing business without outside investment"
            },
            {
                "word": "VENTURE CAPITAL",
                "hint": "Funding provided to early-stage companies"
            },
            {
                "word": "PIVOT",
                "hint": "Fundamental change to business model"
            },
            {
                "word": "RUNWAY",
                "hint": "Time before a startup runs out of cash"
            },
            {
                "word": "UNICORN",
                "hint": "Startup valued at over one billion dollars"
            }
        ],
        "[Strategy] Strategic Innovation in Health Care and Education": [
            {
                "word": "TELEMEDICINE",
                "hint": "Healthcare delivered via digital technology"
            },
            {
                "word": "EDTECH",
                "hint": "Technology used to enhance education"
            },
            {
                "word": "DISRUPTION",
                "hint": "Innovation that transforms an industry"
            },
            {
                "word": "BLENDED LEARNING",
                "hint": "Mix of online and offline education"
            },
            {
                "word": "PERSONALIZATION",
                "hint": "Tailoring experience to individual needs"
            }
        ]
    }
};
