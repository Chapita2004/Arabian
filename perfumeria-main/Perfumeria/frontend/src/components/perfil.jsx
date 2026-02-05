const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Inicia sesión para ver tu perfil</div>;

    return (
        <div className="min-h-screen bg-black pt-32 px-6">
            <div className="max-w-2xl mx-auto border border-[#c2a35d]/30 bg-[#0a0a0a] p-10">
                <h2 className="text-[#c2a35d] text-3xl font-bold tracking-[0.3em] uppercase mb-8 italic">Mi Perfil</h2>
                <div className="space-y-4 text-white">
                    <p className="text-[10px] tracking-widest text-white/50 uppercase">Nombre de usuario</p>
                    <p className="text-lg font-light border-b border-white/10 pb-2">{user.username}</p>

                    <p className="text-[10px] tracking-widest text-white/50 uppercase mt-6">Email</p>
                    <p className="text-lg font-light border-b border-white/10 pb-2">{user.email}</p>
                </div>
            </div>
        </div>
    );
};