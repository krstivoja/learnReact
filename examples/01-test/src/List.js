const ListData = [
    { city: "Tokyo", country: "Japan", population: 37400000 },
    { city: "Delhi", country: "India", population: 31000000 },
    { city: "Beijing", country: "China", population: 21500000 },
    { city: "Cairo", country: "Egypt", population: 20500000 },
    { city: "Dhaka", country: "Bangladesh", population: 21000000 },
    { city: "Mexico City", country: "Mexico", population: 9200000 },
    { city: "London", country: "United Kingdom", population: 9000000 },
    { city: "Paris", country: "France", population: 11000000 },
    { city: "Bangkok", country: "Thailand", population: 10500000 },
    { city: "Ottawa", country: "Canada", population: 1000000 }
];

export function ListItem({ city, country, population }) {
    return <li className="bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{city}</h1>
        <p>{country}</p>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-md">{population}</span>
    </li>;
}

export default function List() {
    return <ul className="list-none grid grid-cols-2 gap-4">
        {ListData.map((city) => (
            <ListItem key={city.city} {...city} />
        ))}
    </ul>;
}