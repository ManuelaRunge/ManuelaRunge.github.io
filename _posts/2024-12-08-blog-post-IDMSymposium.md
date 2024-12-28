---
title: 'Learnings from the IDM Symposium 2024'
date: 2024-10-06
permalink: /posts/2024-12-08-blog-post-IDMSymposium/
tags:
  - conference
  - reports
---

See original article on LinkedIn [here](https://www.linkedin.com/pulse/learnings-from-idm-symposium-2024-manuela-runge-hcs0f/?trackingId=0g6b%2F%2BM5R4C6DtKM5W7i2A%3D%3D)

### "Global public health in a chaotic world: The role of modeling & data science"
The Institute for Disease Modelling at the Bill and Melinda Gates foundation organized this year a symposium to host speakers and poster presenters from across the world and to facilitate networking and exchange.

After having planned to attend virtually, I am very grateful that I ended up attending in person, as I could imagine me sleeping through the sessions otherwise due to the time-difference - kudos to all who attended and especially to those who presented virtually at night!

To make make most of the event and my attendance, I briefly reflect here on what I have learned and collated a list of software/tools/methods mentioned across talks at the end of this article.

### 5 personal learnings from the symposium and beyond 

The agenda shows a wide breath including innovations in infectious disease modeling, data-driven decision-making, and public health intervention strategies, discussions on global health challenges like malaria, tuberculosis, HIV, and vaccine-preventable diseases, alongside advancements in computational tools and statistical modeling. View full agenda.

#### Learning 1: The world is big, but parameter sampling can be bigger...
... modeling is only as good as the data and requires careful calibration. So no surprise that there was a session on this topic, presenting advancements on calibration methods.

In one talk the parameter space to sample was compared to the stars in the observable universe (2 × 10²³ stars) and in the following talk to the number of estimated mosquitoes on earth (1.1×10^14). I did not know those two items had been tried to be quantified, or that the estimated number would be as high - thanks to Aurelien Cavelan (Swiss TPH) and Tobias Holden (Northwestern University) for great talks and fun-facts included!

Lack of data to inform parameters and related uncertainty in parameters as well as in model structure are reason for the infamous quote "all models are wrong", however, ensemble modelling had shown that the use of multiple models can increase confidence in the results. This approach had received increasing traction and use during COVID-19. ... and still is being used and improved, as I learned in one of the talks about the Scenario Modeling Hub by Justin Lessler (University of North Carolina).

#### Learning 2: Advancements in AI and use of LLM need to be closely followed...
... for their utility and power to synthesize large volumes of evidence and information, especially in the field of using AI for supporting policy and decision making. The field is evolving quickly, and I have not been following it so far, nor do I understand the methods as much as I would like (at all?). Several exciting new tools and applications were introduced: For instance, BUMPER builds on AI and LLM to synthesize evidence to answer questions from the user, presented by Katherine Rosenfeld, IDM. The framework allows to learn via query instead of by observation. One tangible example for me, was to ask BUMBER in what years to run the next SIA campaigns.

#### Learning 3: Side meetings and 'chance' meetings enhance the experience and benefit of attending a Symposia...
...apart from the symposium, I was attending side meetings on malaria modelling, which allowed me to stay connected and foster collaboration in that space. In addition, the conversations about model calibration and model comparison were very insightful, malaria is such a complex disease, questions such as temperature dependence of sporogony in mosquitoes of how a clinical case is defined (and how it is modeled) are not trivial at all. Separately, I was also amazed that I was able to meet two collaborators for other (even non-malaria) projects (one at the airport!). Those situations are great, when additional benefit of the travel is generated - especially given that travel, cost, and opportunity cost of not doing project work, are non-negligible considerations for attending such events.

#### Learning 4: Dilemma of finding the right timing of vaccinations under real world challenges...
...this is not a new learning per se, immunization programs have worked on this for many decades and immunization schedules have been around for long. However, one talk caught my attention on the measles vaccination - vaccinating too early increases the risk of failure, while too late increases the risk of getting measles first. While there are recommended ages (6 and 9 months), in practice children do not come exactly and only at their birthdays to get the vaccine... very excited to hear about the approach to include vaccination delays in the measles model (work by Elizabeth Goult, Max Planck Institute for Infection Biology preprint). The results also showed that there is a high range of optimal ages, depending on the local epidemiology. Having worked on a related age-/time sensitive intervention, that is perennial malaria chemoprevention we had also found that the best operational timing (i.e. reaching highest coverage) and the best epidemiological timing (i.e. targeting when disease burden is highest) do not necessarily overlap. -> recommended schedules need to be tailored to the local context and local epidemiology and risk of transmission.

#### Learning 5: Closing Remarks - learn from others, share knowledge and strive for a common understanding..
...or at least that's some of the key words that stick to my mind from the closing remarks, when Philip Welkhoff (Director, Malaria; Director, IDM) invited the participants to answer the question:

#### Question to the audience: "What surprised you? What have you learned?"
Answers from participants to that question included:

    "Platform to bring different scientists, topics together to allow collaborations where the "sum is bigger than its individual parts"  
    "Strengths of community and shared understanding (of the complexities and scientific challenges as well as excitement)"  
    "Collective thinking and advancements to tackle together big questions, such as on cause of deaths and new tools to address this."  
    "Among several other voices of excitement and gratefulness about the event."  

#### Question to the audience to take home from the symposium:
To provide the symposium attendees with some additional questions to ponder about on the way home or way to the office next day, Welkhoff posed additional more specific questions for the modelling community:

    How to support partners, decision-makers and other stakeholders to achieve best possible outcomes over time? What is needed to be successful over the next 5 years?

A word of caution was raised regarding the use of LLM's, as they might skip over some of the important thought processes of unfolding the answer to a question, and revealing what it is that we actually try to answer. Importantly, how do we know when we have found the (correct) answer, to a (wrong?) question?

    He fittingly closed the symposium of two days packed with technical talks with "Thanks to numbers for existing".

### List of highlighted tools, software, or frameworks:
(mostly in random order, some talks I have attended, while some I only discovered upon re-reading the agenda while writing this post, and one I have contributed to (i.e, MultiMalModPy)

#### Transmission and related models
- EMOD-HIV and EMOD-Malaria and other EMOD related tools, postprocessing approaches (i.e. using R), and validation frameworks - presented at the EMOD user group meeting, which is now growing into an open community! Several presentation during the symposium used one of those two models (HIV Samuel Mwalili, Center for Health Analytics and Modelling, Strathmore University, Kenya: Estimated HIV risk around funeral practices and mitigation strategies in western Kenya: A mathematical modeling study; malaria Ai-Ling Jiang, University of California Irvine: Balancing irrigation and malaria risk: Integrating hydrologic and malaria modeling to optimize agricultural practices in western Kenya; Tobias Holden, Northwestern University Bayesian optimization frameworks for recalibration of EMOD’s within-host malaria model)
- Starsim - A fast, flexible toolbox for agent-based modeling of health and disease (Cliff Kerr, IDM offered a Lunch & learn and a Thursday learning day, the use of Starsim was showcased in several talks during the symposium (Abel Walekhwa, University of Cambridge and Godfrey Madigu, Strathmore University: Agent-based modelling of missed Rift Valley Fever disease cases among cattle in Uganda ; Dominic Delport, Burnet Institute: Estimating the historical impact of outbreak response immunization programs across 210 outbreaks in LMICs (preprint), Betsy Rono, Jomo Kenyatta University of Agriculture and Technology: Agent-based modelling (ABM) predicts number needed to vaccinate to achieve a 50% reduction in zero-dose vaccination among under-five (5) children in Kenya by 2025; Dr. Robyn Stuart, Gates Foundation (independent consultant): Priority data gaps for quantifying the impact of novel syphilis interventions: A mathematical modeling analysis).
- malariasimulation - (used in the presentation by Hillary Topazian, Imperial College London: Estimating the potential impact of surveillance test-and-treat posts to reduce malaria in border regions in sub-Saharan Africa: A modelling study)
- OpenMalaria - its use showcases in several talks (Lydia Braunack-Mayer, SwissTPH: Combining seasonal malaria chemoprevention with new therapeutics for malaria prevention: a mathematical modelling study, Aurelien Cavelan, SwissTPH: Improved calibration of OpenMalaria with efficient multi-objective Bayesian optimisation)
- Vectri & OpenMalaria (presented by Alexis Martin, Swiss TPH in Climate variability impacts malaria seasonal interventions: An ‘In Silico’ simulation combining two mathematicals models for malaria)
- MultiMalModPy (presented by Ricky Richter, Northwestern University 'A novel framework to run three individual based malaria models concurrently')
- multi-resolution spatial model of measles transmission - (Katherine Rosenfeld, IDM: Spatial modeling in support of measles control and elimination)

#### AI, LLM and related methods
- BUMPER - Building Understandable Messaging for Policy and Evidence Review (BUMPER) with AI (presented by Katherine Rosenfeld, IDM: Essential AI for translating science to policy)
- BEACON - Biothreats Emergence, Analysis and Communications Network (BEACON) - (presented by Britta Lassmann, BEACON: Biothreats Emergence, Analysis and Communications Network)
- LLM performance evaluation using ROUGE-1 scores (used in presentation by Jessica Lundin, IDM: Annotation quality and finetuning LLMs on low-resource languages)
- multiPPI++ (Tyler McCormick, University of Washington: From narratives to numbers: Valid inference using language model predictions from verbal autopsy narratives)
- ChatGPT-4 (Mamadou Alpha Diallo, Cheikh Anta Diop University: Harnessing AI for infectious disease control in Africa)
Chain of Cause Reasoning (CCR) - (Geoffrey Siwo, University of Michigan Medical School: Grounding large-language models with real-world public health knowledge using Chain of Cause Reasoning)

#### Statistics, Bayesian, and related methods
- A novel calibration workflow using BoTorch - Bayesian Optimization in Python (used in the presentation by Aurelien Cavelan, Swiss TPH 'Improved calibration of OpenMalaria with efficient multi-objective Bayesian optimisation' and Tobias Holden, Northwestern University Bayesian optimization frameworks for recalibration of EMOD’s within-host malaria model)
- Another bayesian framework, STAN was used in at least one of the talks (used in the presentation by Judith Bouman, University of Bern: Understanding the population-level impact of mass vaccination campaigns against cholera in Uvira, South Kivu, Democratic Republic of the Congo, [Global Task Force on Cholera control project website])
- INLA for spatial modelling was also represented through several talks (Justice Moses Kwaku Aheto, University of Ghana: Spatiotemporal modelling and interactive web-based spatial mapping of malaria risk under Integrated Nested Laplace Approximation to support preventive and control efforts in Ghana; R-INLA & TMB (Template Model Builder) and Onyango Sangoro, Ifakara Health Institute: Use of school-based malaria parasiteamia survey (SMPS) data to map the spatio-temporal malaria risk in mainland Tanzania)
- MAP, not a tool but ensemble of different tools used and combined (Ousmane Diao, MAP: Fine-scale malaria risk maps of routine incidence data in Senegal to inform risk stratification)
- 'statistical framework to estimate time-varying sensitivity of two key components of polio surveillance' (Emily Nightingale, London School of Hygiene and Tropical Medicine: Sub-national estimation of surveillance sensitivity to inform declaration of disease elimination)
- Dynamic Cellular Automata (CA) (applied in the presentation by Eric Ibrahim, International Centre of Insect Physiology and Ecology: Spatio-temporal dynamics of malaria vector niche overlaps in Africa )
- 'novel statistical framework to combine case counts and whole genome sequence data' (Dr. Bethany DiPrete, UNC Chapel Hill: Combining epidemiologic and genomic data to better understand cholera transmission in Africa)
- Oaxaca-Blinder decomposition analysis (Annie Haakenstad, Institute for Health Metrics and Evaluation: Decomposition analysis for adolescent sexual and reproductive health and rights exemplars, related earlier publication)

#### Other
- SaniPath Exposure Assessment Toolkit (used in the presentation by Cecilia Mbae, Kenya Medical Research Institute: Measurement of human-environment behaviours and fecal contamination for assessing risk of cholera in urban Kenya)
- FPsim (use presented by Evans Omondi, African Population and Health Research Center: Modelling the impact of male involvement on fertility preferences, contraceptive use, and pregnancy outcomes in Nairobi's Urban slums; and Ms. Aasli Nur, University of Oxford: Modeling contraceptive method skew in Ethiopia using FPsim)
- EasyVA - (David Kong, IDM: Installing a verbal autopsy system (EasyVA) in your own country)
- MalKinID - (Wesley Wong, Harvard TH Chan School of Public Health: MalKinID (Malaria Kinship Identifier): A likelihood model for identifying parasite genealogy relationships based on genetic relatedness preprint)
- Scenario modeling hub (Justin Lessler, University of North Carolina: Scenario Modeling Hub: Update and future work)
- Several custom built ABMs and extensions were presented as well (Eva Akurut, African Centre of Excellence in Bioinformatics and Data Intensive Sciences/Makerere Lung Institute: Modelling the impact of effective malaria vaccination on child mortality in Ugandan children under 5 years old; Verrah Otiende, USIU-Africa: Agent-based simulation of contact networks and mobility patterns for COVID-19 in Kenya; Anabelle Wong, Max Planck Institute for Infection Biology: Assessing the impact of social contact structure on serotype replacement following pneumococcal conjugate vaccination: A mathematical modeling study)

Did I miss one of the tools that should be mentioned here? Please let me know!

[go to symposium agenda][view all tools from IDM]



