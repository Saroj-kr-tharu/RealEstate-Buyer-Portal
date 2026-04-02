import { FiEdit, FiEye, FiHeart, FiTrash2 } from 'react-icons/fi';


export default function ItemCard({ item, onFn, from="homedd" }) {
return (
    <div className="card bg-base-100 w-80 shadow-md hover:shadow-xl transition duration-300">
      
      <figure className="h-52 overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover"/>
      </figure>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title text-lg">{item.title}</h2>

        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <p className="text-xl font-semibold text-primary">
          Npr {item.price}
        </p>

        {/* Actions */}

         <div className="card-actions justify-between mt-3">
          {from === "agent" ? (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => onFn("view", item)}>
                <FiEye /> View
              </button>
              <button className="btn btn-warning btn-sm" onClick={() => onFn("update", item)}>
                <FiEdit /> Update
              </button>
              <button className="btn btn-error btn-sm" onClick={() => onFn("delete", item)}>
                <FiTrash2 /> Delete
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => onFn("view", item)}>
                <FiEye /> View
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => onFn(from == "home" ? "like" : "dislike", item)}>
                <FiHeart /> Like
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => onFn( "buy", item)}>
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}