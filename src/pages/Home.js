function HomePage() {
    const connect = () => {
        fetch('http://localhost:3000/oauth2/user-agent')
            .then(async response => {
                const htmlStr = await response.text();
                console.log(htmlStr);
                const w = window.open();
                w?.document.write(htmlStr);
            }).catch(error => console.error("Error fetching data:", error));
    }

    return (
        <div>
            <h1>My Home Page</h1>
            <button onClick={connect}>Connect to SF</button>
        </div>

    )
}

export default HomePage;