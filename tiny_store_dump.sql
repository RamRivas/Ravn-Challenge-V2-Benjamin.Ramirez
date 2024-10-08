PGDMP     5                    |         
   tiny_store    15.2    15.2 1    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    16398 
   tiny_store    DATABASE     �   CREATE DATABASE tiny_store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_El Salvador.1252';
    DROP DATABASE tiny_store;
                postgres    false                        2615    24715    sample    SCHEMA        CREATE SCHEMA sample;
    DROP SCHEMA sample;
                postgres    false            �            1259    16427    endpoint    TABLE     v   CREATE TABLE public.endpoint (
    endpoint_id integer NOT NULL,
    endpoint_name character varying(200) NOT NULL
);
    DROP TABLE public.endpoint;
       public         heap    postgres    false            �            1259    16426    endpoint_endpoint_id_seq    SEQUENCE     �   ALTER TABLE public.endpoint ALTER COLUMN endpoint_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.endpoint_endpoint_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    16438    endpoint_role_method    TABLE     �   CREATE TABLE public.endpoint_role_method (
    endpoint_id integer NOT NULL,
    role_id integer NOT NULL,
    method_id integer NOT NULL
);
 (   DROP TABLE public.endpoint_role_method;
       public         heap    postgres    false            �            1259    16433    http_method    TABLE     u   CREATE TABLE public.http_method (
    method_id integer NOT NULL,
    method_name character varying(200) NOT NULL
);
    DROP TABLE public.http_method;
       public         heap    postgres    false            �            1259    16432    html_method_method_id_seq    SEQUENCE     �   ALTER TABLE public.http_method ALTER COLUMN method_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.html_method_method_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    32908    product    TABLE     �  CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_description text NOT NULL,
    product_image_path text,
    product_stock integer NOT NULL,
    product_status bit(1) DEFAULT '1'::"bit" NOT NULL,
    creation_date timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modification_date timestamp(6) without time zone
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    32907    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    228            E           0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    227            �            1259    16421    role    TABLE     j   CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name character varying(200) NOT NULL
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    16420    role_role_id_seq    SEQUENCE     �   ALTER TABLE public.role ALTER COLUMN role_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.role_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16500    token    TABLE     %  CREATE TABLE public.token (
    token_id integer NOT NULL,
    refresh_token text NOT NULL,
    token_status bit(1) DEFAULT '1'::"bit" NOT NULL,
    creation_date timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    destroy_date timestamp without time zone
);
    DROP TABLE public.token;
       public         heap    postgres    false            �            1259    16499    token_token_id_seq    SEQUENCE     �   ALTER TABLE public.token ALTER COLUMN token_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.token_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    16415    user    TABLE     �   CREATE TABLE public."user" (
    user_id integer NOT NULL,
    user_name character varying(200) NOT NULL,
    pwd text NOT NULL,
    role_id integer NOT NULL,
    forgot_pwd bit(1) DEFAULT '0'::"bit" NOT NULL,
    mail_address text
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16467 	   user_role    TABLE     ^   CREATE TABLE public.user_role (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);
    DROP TABLE public.user_role;
       public         heap    postgres    false            �            1259    16414    user_user_id_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �           2604    32911    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    227    228    228            6          0    16427    endpoint 
   TABLE DATA           >   COPY public.endpoint (endpoint_id, endpoint_name) FROM stdin;
    public          postgres    false    220   :9       9          0    16438    endpoint_role_method 
   TABLE DATA           O   COPY public.endpoint_role_method (endpoint_id, role_id, method_id) FROM stdin;
    public          postgres    false    223   o9       8          0    16433    http_method 
   TABLE DATA           =   COPY public.http_method (method_id, method_name) FROM stdin;
    public          postgres    false    222   �9       >          0    32908    product 
   TABLE DATA           �   COPY public.product (product_id, product_name, product_description, product_image_path, product_stock, product_status, creation_date, modification_date) FROM stdin;
    public          postgres    false    228   �9       4          0    16421    role 
   TABLE DATA           2   COPY public.role (role_id, role_name) FROM stdin;
    public          postgres    false    218   �9       <          0    16500    token 
   TABLE DATA           l   COPY public.token (token_id, refresh_token, token_status, creation_date, user_id, destroy_date) FROM stdin;
    public          postgres    false    226   $:       2          0    16415    user 
   TABLE DATA           \   COPY public."user" (user_id, user_name, pwd, role_id, forgot_pwd, mail_address) FROM stdin;
    public          postgres    false    216   A:       :          0    16467 	   user_role 
   TABLE DATA           5   COPY public.user_role (user_id, role_id) FROM stdin;
    public          postgres    false    224   ^:       F           0    0    endpoint_endpoint_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.endpoint_endpoint_id_seq', 2, true);
          public          postgres    false    219            G           0    0    html_method_method_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.html_method_method_id_seq', 5, true);
          public          postgres    false    221            H           0    0    product_product_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_product_id_seq', 7, true);
          public          postgres    false    227            I           0    0    role_role_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.role_role_id_seq', 2, true);
          public          postgres    false    217            J           0    0    token_token_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.token_token_id_seq', 148, true);
          public          postgres    false    225            K           0    0    user_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_user_id_seq', 34, true);
          public          postgres    false    215            �           2606    16431    endpoint endpoint_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.endpoint
    ADD CONSTRAINT endpoint_pkey PRIMARY KEY (endpoint_id);
 @   ALTER TABLE ONLY public.endpoint DROP CONSTRAINT endpoint_pkey;
       public            postgres    false    220            �           2606    16442 .   endpoint_role_method endpoint_role_method_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.endpoint_role_method
    ADD CONSTRAINT endpoint_role_method_pkey PRIMARY KEY (endpoint_id, role_id, method_id);
 X   ALTER TABLE ONLY public.endpoint_role_method DROP CONSTRAINT endpoint_role_method_pkey;
       public            postgres    false    223    223    223            �           2606    16437    http_method html_method_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.http_method
    ADD CONSTRAINT html_method_pkey PRIMARY KEY (method_id);
 F   ALTER TABLE ONLY public.http_method DROP CONSTRAINT html_method_pkey;
       public            postgres    false    222            �           2606    32917    product product_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    228            �           2606    16425    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    218            �           2606    16507    token token_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (token_id);
 :   ALTER TABLE ONLY public.token DROP CONSTRAINT token_pkey;
       public            postgres    false    226            �           2606    16419    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    216            �           2606    16481    user_role user_role_pk 
   CONSTRAINT     b   ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pk PRIMARY KEY (user_id, role_id);
 @   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_pk;
       public            postgres    false    224    224            �           2606    16482 $   endpoint_role_method erm_endpoint_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.endpoint_role_method
    ADD CONSTRAINT erm_endpoint_fk FOREIGN KEY (endpoint_id) REFERENCES public.endpoint(endpoint_id);
 N   ALTER TABLE ONLY public.endpoint_role_method DROP CONSTRAINT erm_endpoint_fk;
       public          postgres    false    223    220    3218            �           2606    16492 "   endpoint_role_method erm_method_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.endpoint_role_method
    ADD CONSTRAINT erm_method_fk FOREIGN KEY (method_id) REFERENCES public.http_method(method_id);
 L   ALTER TABLE ONLY public.endpoint_role_method DROP CONSTRAINT erm_method_fk;
       public          postgres    false    222    3220    223            �           2606    16487     endpoint_role_method erm_role_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.endpoint_role_method
    ADD CONSTRAINT erm_role_fk FOREIGN KEY (role_id) REFERENCES public.role(role_id);
 J   ALTER TABLE ONLY public.endpoint_role_method DROP CONSTRAINT erm_role_fk;
       public          postgres    false    218    3216    223            �           2606    16508    token token_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);
 B   ALTER TABLE ONLY public.token DROP CONSTRAINT token_user_id_fkey;
       public          postgres    false    3214    216    226            �           2606    16475     user_role user_role_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id) ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_role_id_fkey;
       public          postgres    false    218    3216    224            �           2606    16470     user_role user_role_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_user_id_fkey;
       public          postgres    false    216    3214    224            6   %   x�3��O,��/��I��2�p
��SJ�K��b���� �4	s      9      x�3�4�4�2�F\1z\\\ 	      8   1   x�3�tw�2���2��2�pq��2�tq�qq����� �I      >      x������ � �      4       x�3��M�KLO-�2�t��L�+����� U�L      <      x������ � �      2      x������ � �      :      x������ � �     