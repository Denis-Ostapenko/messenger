import './Loader.css'

type LoaderProps = {
    size: number;
    color?: string
};

const Loader = ({ size, color }: LoaderProps): JSX.Element => (
    <div className="loader" style={{width: `${size}px`, height: `${size}px`}}>
        <div className="loader__row" style={{width: `${size}px`, height: `${size}px`}}>
            <div className="loader__item" style={{width: `${size/2}px`, height: `${size/2}px`, backgroundColor: color}}></div>
            <div className="loader__item" style={{width: `${size/2}px`, height: `${size/2}px`, backgroundColor: color}}></div>
        </div>
    </div>
)

export default Loader 