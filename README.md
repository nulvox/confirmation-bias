This application was entirely developed by agentic LLMs with Requesty and RooCode in vscode. The Prompt section is the only input provided to the system to generate this output. The setup section describes how to run the provided application.

# setup
1. clone this repo
2. `cd confirmation-bias`
3. `python3 -m venv venv`
4. `source venv/bin/activate`
5. `pip install -r requirements.txt`
6. `python3 -m http.server 8000`
7. Open your browser to `localhost:8000` and play

# Prompt
Make a graphical web application with python3 and flask which illustrates the negative impact of confirmation bias on decision paths. 

In this application, the majority of the page should be an open canvas for visualizations with small UI control elements to the side and above the canvas. In the simulation, we should draw a circle at a random point on the canvas with the user's desired radius and then draw a number of dots equal to the user's defined sample size at random positions on the canvas. For each point selected inside the circle, increment the hidden value "confirmation".

UI input elements:
 - target radius: this an input box for a float which will be used later to draw the target circle on the canvas and represents how obscure the logical premise is the user is asking about
 - sample size: this is an integer input box which represents how many attempts to confirm the premise are taken. This will be how many dots are drawn on the canvas in a test
 - Test! button: this is just a button which runs a test with the provided parameters.
 - Clear! button: this is a simple button which clears current test results.
UI output elements:
 - Unbiased confirmation rate: this is displayed as a ratio and % of confirmation/sample size
 - Biased confirmation rate: this is displayed as a ratio and % of confirmation/confirmation

Lastly, include a section at the bottom describing how this tool relates to confirmation bias and why it is important to avoid that fallacy. If possible, also include a definition of confirmation bias with the latin name included.
