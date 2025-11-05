---
layout: post
---

i've recently come across the following [blog](https://ethanlazuk.com/blog/how-does-perplexity-work/) for a project i'm leading. 

the project's objective is to basically create a local smart answering machine that replies with high precision given a basic context. 

the requirements for the project were straightforward: 
 > build a rag
 > feed context to local llm
 > stream response 

as testing started, some issues in the quality of the data and thus the replies started showing and what started as a simple local answering machine turned out to grow much more like a smart scrapping service.

so i've started digging into perplexity's secret sauce that's where i found the following blog which goes into a 4 step process:

1. query processing
 > run a multi-step context and query analysis through prompting and basic indexing (tf-idf)
 > classify the query complexity given what we already know and have
2. retrieval
 > not everything as to be a vector
 > focus on the most obvious and relevant data retrieved (trust the google first page)
 > indexing links's good but scraping data from the pages can provide more in-depth context
 > keeping a list of verified and trusted third parties sources
3. answer generation
 > again, identify the most relevant snippets given the query, context and conversation history
 > keep the answering within the context and if not enough info to answer say it !
 > cite everything 
 > maintain the list of used sources for further questions
4. post-processing and refinement
 > keep some form of customer feedback on each response and adjust accordingly
 

the architecture and perplexity's way of dealing with the data is refreshing and very relevant. although we are not in the position of having a full scale hybrid search engine infrastructure we are taking the wrapper strategy to the max and use every bit of open source projects there is to build our smart answering machine.



 