export default function UrlCard({ url }) {
    return (
        <div>
            <h3>{url.code}</h3>
            <p>{url.originalUrl}</p>
            <p>{url.clicks} clicks</p>
        </div>
    );
}