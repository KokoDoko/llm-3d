import words from './vectordata/pcavectors.json' with { type: "json" };

// el problemo: plotly 3d with labels initial render takes VERY long in safari due to webGL issues
// either remove the labels or try a webGL wordcloud such as https://github.com/ecomfe/echarts-gl

function createPlot(dataPoints) {
    let x = dataPoints.map(item => item.vector[0]);
    let y = dataPoints.map(item => item.vector[1]);
    let z = dataPoints.map(item => item.vector[2]);

    let labels = dataPoints.map(p => p.word); 
    
    //Find the lowest and highest values from the combined array
    //let combined = [...x, ...y, ...z];
    //let range = [Math.min(...combined), Math.max(...combined)];

    // since the json file is static we can pre-calculate the range
    let range = [-3.7, 3.7]

    // Define 3D scatter plot
    let trace = {
        x,y,z,
        mode: 'markers+text',  // Enables both markers and text labels - heavy for safari
        text: labels,  // Assign labels
        // textposition: 'top center',  // Position above points - default already?
        marker: {
            size: 8,
            color: z, // Color based on z-values // todo use kmeans to color clusters
            colorscale: 'Viridis',
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    // Layout options
    let layout = {
        title: '3D Scatter Plot',
        scene: {
            xaxis: { title: 'X Axis', range },
            yaxis: { title: 'Y Axis', range },
            zaxis: { title: 'Z Axis', range }
        }
    };


    // Render the plot
    Plotly.newPlot('plot', [trace], layout)

    document.querySelector("dialog").close()
}

window.onresize = function () {
    Plotly.Plots.resize(document.getElementById('plot'));
};


// const words = await fetchData()
createPlot(words)

