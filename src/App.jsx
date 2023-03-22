import { useEffect, useState } from "react";
import "./styles.css";
const cat_endpoint_random_fact = "https://catfact.ninja/fact";
//const cat_endpoint_image_url = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const cat_prefix_url = "https://cataas.com";

export function App() {
	const [fact, setFact] = useState();
	const [imageUrl, setImageUrl] = useState();

	// recupera el fact
	useEffect(() => {
		fetch(cat_endpoint_random_fact)
			.then((res) => res.json())
			.then((data) => {
				const { fact } = data;
				setFact(fact);
			});
	}, []);

	//recuperar img cuando hay un fact
	useEffect(() => {
		if (!fact) return;
		const firstWord = fact.split(" ", 3).join(" ");
		fetch(
			`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
		)
			.then((res) => res.json())
			.then((response) => {
				const { url } = response;
				setImageUrl(url);
			});
	}, [fact]);

	return (
		<main>
			<h1>app de gatos</h1>
			<section>
				{fact && <p>{fact}</p>}
				{imageUrl && (
					<img
						src={`${cat_prefix_url}${imageUrl}`}
						alt={`image extracted using the first three words for: "${fact}"`}
					/>
				)}
			</section>
		</main>
	);
}
