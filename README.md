# Language Models Visualised

🔥 [LIVE PAGE HERE](https://kokodoko.github.io/llm-3d/) 🔥

<br><bR><bR>

## An AI-assisted experiment

The goal of this experiment was to find out if words from a language model can be visualised in 3D, while also learning about various related algorithms and models. All of this using AI code generation tools. [See the footer for some prompting tips!](#footer)

<br><bR><bR>

## Words as vectors

A language model works by converting text into vectordata (a list of numbers), which helps the model find relations between words and sentences. Vectordata for the word "cat" might look like this:

```
[0.47685,-0.084552,1.4641,0.047017,0.14686,0.5082,-1.2228,-0.22607,0.19306,-0.29756,...etc]
```
If we can somehow reduce this array of numbers to 3, we can place the words in a 3D space.

<br><bR><bR>


## Too many dimensions

Depending on the language model you use, the amount of numbers (dimensions) in a vector can be quite large. [OpenAI's ADA](https://platform.openai.com/docs/guides/embeddings) model will generate 1536 numbers, and [HuggingFace MiniLM-L6](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) will generate 384 numbers for one prompt (a word or a sentence)

Reducing these vectors down to 3 proved quite challenging. The problem is that advanced LLM's do not really work by assigning vectors to single words. These models are very good at finding complex relationships in complete narratives and sentences. Also, single words can consist of multiple tokens.

<br><bR><bR>


### Comparing relations

One thing that does work with vectordata of these complex LLM's is to calculate the distance between two prompts, or sentences. Distance can be calculated as [cosine](https://en.wikipedia.org/wiki/Cosine_similarity) (angles) or [euclidian](https://en.wikipedia.org/wiki/Euclidean_distance) (pythagorean distance). This graphic shows how close [MiniLM-V6](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) sentences are to each other.

```
My garden is full of flowers <->        Flowers and plants are in my garden 
My garden is full of flowers <->        My garden is very beautiful         
My garden is full of flowers <->        Red flowers are my favorite 
The race track has many cars <------>   Shakespeare couldn't write a play in a day
The race track has many cars <------->  Shakespeare wrote many plays 
The race track has many cars <--------> Shakespeare wrote plays about love 
```

HuggingFace models can be loaded locally using [tranformers.js](https://huggingface.co/docs/hub/en/transformers-js)

<br><bR><bR>


## A simpler model

To get a better result for 3D visualisation it proved easier to use an old-fashioned language model, that gives you a static vector array for each word. This is how natural language processing worked before the age of LLM's.

[The Glove Model](https://nlp.stanford.edu/projects/glove/) is a simple text file that contains 50 vectors for common english words. Using this model, we can use the [distance](https://en.wikipedia.org/wiki/Cosine_similarity) between these vectors to find related words.

```javascript
findRelatedWords("cat")
[
    { word: 'dog',    similarity: 0.9218 },
    { word: 'rabbit', similarity: 0.8487 },
    { word: 'monkey', similarity: 0.8041 },
    { word: 'rat',    similarity: 0.7891 },
    { word: 'cats',   similarity: 0.7865 }
]
```

<br><bR><bR>


### Reducing dimensions

To reduce these 50 dimensions to 3 we need a dimension reduction algorithm. ChatGPT suggested the [T-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding) and the [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis) algorithms.

Experimenting proved that this [Javascript PCA library](https://github.com/mljs/pca) is able to reduce 50 dimensions to 3, without losing the relative positions of the words. This allows us to create the [3D plotly graph](https://plotly.com/javascript/) on the top of this page!

```json
"word": "car",
"vector": [
    0.49308144754274674,
    -3.650149578055416,
    1.5510818764700405
]
```

<br><bR><bR>


## Vibe Coding

A lot of this research was accelerated tremendously by using AI code generation such as Claude, Copilot and Blackbox. Here are a couple of prompts that worked well:

- How can I load a Huggingface model with transformers.js?
- Which language models are good at generating simple vectors for single words?
- Give a code example for reading the GLOVE language model
- How can I calculate the distance between 50-dimensional vectors?
- How can I reduce a vector of 50 dimensions to 3?
- Create a 3D plotly graph that shows my vector data

The main concept of this experiment, and also this explanation, was created without any AI assistance.