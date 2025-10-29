--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

-- Started on 2025-10-28 19:19:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 26858)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id bigint NOT NULL,
    city character varying(255),
    district character varying(255),
    is_default character varying(1) DEFAULT '0'::character varying NOT NULL,
    phone_number character varying(15),
    recipient_name character varying(255),
    street character varying(255) NOT NULL,
    ward character varying(255) NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 26857)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO postgres;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 219
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 222 (class 1259 OID 26874)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    logo_url character varying(255),
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 26873)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 221
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 238 (class 1259 OID 26984)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id bigint NOT NULL,
    cart_id bigint NOT NULL,
    variant_id bigint,
    quantity integer NOT NULL,
    unit_price double precision NOT NULL,
    total_price double precision NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 26983)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 237
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 224 (class 1259 OID 26884)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id bigint NOT NULL,
    user_id bigint,
    session_id character varying(100),
    status character varying(20) DEFAULT 'active'::character varying,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    total_money double precision
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 26883)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 226 (class 1259 OID 26898)
-- Name: categorys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorys (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    image_url character varying(255),
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.categorys OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 26897)
-- Name: categorys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorys_id_seq OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 225
-- Name: categorys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorys_id_seq OWNED BY public.categorys.id;


--
-- TOC entry 232 (class 1259 OID 26945)
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    hex_code character varying(7) NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 26944)
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colors_id_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 231
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;


--
-- TOC entry 240 (class 1259 OID 27002)
-- Name: config_order_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.config_order_status (
    id bigint NOT NULL,
    code character varying(20),
    name character varying(255),
    description character varying(255),
    hex_code character varying(7),
    color character varying(20),
    sort_order integer,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.config_order_status OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 27001)
-- Name: config_order_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.config_order_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.config_order_status_id_seq OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 239
-- Name: config_order_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.config_order_status_id_seq OWNED BY public.config_order_status.id;


--
-- TOC entry 242 (class 1259 OID 27012)
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    id bigint NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255),
    min_order_value double precision,
    max_discount_amount double precision,
    discount_type character varying(1),
    discount_value double precision,
    effective_date character varying(14),
    valid_until character varying(14),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 27011)
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discounts_id_seq OWNER TO postgres;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 241
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.discounts.id;


--
-- TOC entry 228 (class 1259 OID 26908)
-- Name: movement_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movement_types (
    id bigint NOT NULL,
    code character varying(10),
    name character varying(255) NOT NULL,
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.movement_types OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 26907)
-- Name: movement_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movement_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movement_types_id_seq OWNER TO postgres;

--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 227
-- Name: movement_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movement_types_id_seq OWNED BY public.movement_types.id;


--
-- TOC entry 246 (class 1259 OID 27041)
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    variant_id bigint NOT NULL,
    quantity integer,
    unit_price double precision,
    total_price double precision,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    watch_id bigint
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 27040)
-- Name: order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_details_id_seq OWNER TO postgres;

--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 245
-- Name: order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;


--
-- TOC entry 248 (class 1259 OID 27064)
-- Name: order_status_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_status_history (
    id bigint NOT NULL,
    order_id bigint,
    status_id bigint,
    note character varying(255),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.order_status_history OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 27063)
-- Name: order_status_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_status_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_status_history_id_seq OWNER TO postgres;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 247
-- Name: order_status_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_status_history_id_seq OWNED BY public.order_status_history.id;


--
-- TOC entry 244 (class 1259 OID 27020)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint,
    total_amount double precision,
    discount_code character varying(20),
    discount_amount double precision,
    final_amount double precision,
    shipping_address text,
    shipping_fee double precision,
    note character varying(255),
    guess_name character varying(50),
    guess_email character varying(100),
    guess_phone character varying(15),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    current_status_id bigint,
    code character varying(50),
    review_flag character varying(1) DEFAULT '0'::character varying,
    payment_method character varying(1)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 27019)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 243
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 250 (class 1259 OID 27082)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    transaction_code character varying(50),
    amount double precision,
    method character varying(50),
    status character varying(50),
    type character varying(1) DEFAULT '0'::character varying,
    note character varying(255),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    gateway_trans_no character varying(50),
    trans_date character varying(50)
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 27081)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 249
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 254 (class 1259 OID 27106)
-- Name: permission_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission_role (
    id bigint NOT NULL,
    role_id bigint NOT NULL,
    permission_id bigint NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.permission_role OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 27105)
-- Name: permission_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_role_id_seq OWNER TO postgres;

--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 253
-- Name: permission_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_role_id_seq OWNED BY public.permission_role.id;


--
-- TOC entry 252 (class 1259 OID 27096)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    api_path character varying(255) NOT NULL,
    method character varying(255) NOT NULL,
    module character varying(255),
    name character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 27095)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 251
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- TOC entry 256 (class 1259 OID 27124)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    rating double precision NOT NULL,
    comment character varying(255),
    image_url text,
    user_id bigint NOT NULL,
    order_id bigint NOT NULL,
    watch_id bigint NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 27123)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 255
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 216 (class 1259 OID 26834)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    code character varying(50),
    name character varying(50) NOT NULL,
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26833)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 258 (class 1259 OID 27149)
-- Name: shipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipments (
    id bigint NOT NULL,
    order_id bigint,
    carrier character varying(100),
    tracking_code character varying(50),
    estimated_delivery character varying(14),
    delivered_at character varying(14),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.shipments OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 27148)
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shipments_id_seq OWNER TO postgres;

--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 257
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;


--
-- TOC entry 234 (class 1259 OID 26953)
-- Name: strap_materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strap_materials (
    id bigint NOT NULL,
    code character varying(10),
    name character varying(50) NOT NULL,
    description character varying(255),
    extra_money double precision,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.strap_materials OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 26952)
-- Name: strap_materials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strap_materials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strap_materials_id_seq OWNER TO postgres;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 233
-- Name: strap_materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strap_materials_id_seq OWNED BY public.strap_materials.id;


--
-- TOC entry 260 (class 1259 OID 27162)
-- Name: tb_dictionarys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_dictionarys (
    id bigint NOT NULL,
    col_nm character varying(255) NOT NULL,
    col_val character varying(255) NOT NULL,
    content character varying(255),
    lang character varying(2),
    note character varying(255)
);


ALTER TABLE public.tb_dictionarys OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 27161)
-- Name: tb_dictionarys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_dictionarys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_dictionarys_id_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 259
-- Name: tb_dictionarys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_dictionarys_id_seq OWNED BY public.tb_dictionarys.id;


--
-- TOC entry 262 (class 1259 OID 27172)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id bigint NOT NULL,
    owner_type character varying(50),
    user_id bigint NOT NULL,
    token_type character varying(1) NOT NULL,
    token_value character varying(512) NOT NULL,
    device_info character varying(255),
    ip_address character varying(45),
    is_active character varying(1) DEFAULT '1'::character varying NOT NULL,
    expires_at character varying(14) NOT NULL,
    revoked_at character varying(14),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 27171)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 261
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 218 (class 1259 OID 26842)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    code character varying(20),
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255),
    phone_number character varying(15),
    first_name character varying(100),
    last_name character varying(100),
    gender character varying(1),
    date_of_birth character varying(8),
    address text,
    status character varying(1) DEFAULT '0'::character varying NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by integer,
    updated_at character varying(14),
    updated_by integer,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 26841)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 236 (class 1259 OID 26961)
-- Name: watch_variants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watch_variants (
    id bigint NOT NULL,
    watch_id bigint,
    color_id bigint,
    strap_material_id bigint,
    stock_quantity integer,
    price double precision,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.watch_variants OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 26960)
-- Name: watch_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.watch_variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.watch_variants_id_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 235
-- Name: watch_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.watch_variants_id_seq OWNED BY public.watch_variants.id;


--
-- TOC entry 230 (class 1259 OID 26918)
-- Name: watches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watches (
    id bigint NOT NULL,
    code character varying(50),
    name character varying(255),
    description text,
    model character varying(50),
    case_material character varying(50),
    case_size double precision,
    strap_size double precision,
    gender character varying(1),
    water_resistance character varying(255),
    release_date character varying(14),
    sold integer DEFAULT 0,
    base_price double precision,
    rating double precision,
    status boolean DEFAULT true,
    thumbnail character varying(255),
    slider text,
    created_at character varying(14),
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    category_id bigint NOT NULL,
    brand_id bigint NOT NULL,
    movement_type_id bigint NOT NULL,
    created_by bigint
);


ALTER TABLE public.watches OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 26917)
-- Name: watches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.watches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.watches_id_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 229
-- Name: watches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.watches_id_seq OWNED BY public.watches.id;


--
-- TOC entry 4754 (class 2604 OID 26861)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 26877)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 26987)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 26887)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 26901)
-- Name: categorys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorys ALTER COLUMN id SET DEFAULT nextval('public.categorys_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 26948)
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 27005)
-- Name: config_order_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config_order_status ALTER COLUMN id SET DEFAULT nextval('public.config_order_status_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 27015)
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 26911)
-- Name: movement_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movement_types ALTER COLUMN id SET DEFAULT nextval('public.movement_types_id_seq'::regclass);


--
-- TOC entry 4785 (class 2604 OID 27044)
-- Name: order_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 27067)
-- Name: order_status_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history ALTER COLUMN id SET DEFAULT nextval('public.order_status_history_id_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 27023)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 27085)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 27109)
-- Name: permission_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role ALTER COLUMN id SET DEFAULT nextval('public.permission_role_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 27099)
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 27127)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 26837)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 27152)
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 26956)
-- Name: strap_materials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strap_materials ALTER COLUMN id SET DEFAULT nextval('public.strap_materials_id_seq'::regclass);


--
-- TOC entry 4800 (class 2604 OID 27165)
-- Name: tb_dictionarys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_dictionarys ALTER COLUMN id SET DEFAULT nextval('public.tb_dictionarys_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 27175)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 26845)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 26964)
-- Name: watch_variants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants ALTER COLUMN id SET DEFAULT nextval('public.watch_variants_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 26921)
-- Name: watches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches ALTER COLUMN id SET DEFAULT nextval('public.watches_id_seq'::regclass);


--
-- TOC entry 4808 (class 2606 OID 26867)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 4810 (class 2606 OID 26882)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 26990)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 26891)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4814 (class 2606 OID 26906)
-- Name: categorys categorys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorys
    ADD CONSTRAINT categorys_pkey PRIMARY KEY (id);


--
-- TOC entry 4820 (class 2606 OID 26951)
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 27010)
-- Name: config_order_status config_order_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config_order_status
    ADD CONSTRAINT config_order_status_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 27018)
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 26916)
-- Name: movement_types movement_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movement_types
    ADD CONSTRAINT movement_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4834 (class 2606 OID 27047)
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 27070)
-- Name: order_status_history order_status_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4832 (class 2606 OID 27029)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 27089)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 27112)
-- Name: permission_role permission_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 27104)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 27132)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 26840)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 27155)
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 26959)
-- Name: strap_materials strap_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strap_materials
    ADD CONSTRAINT strap_materials_pkey PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 27169)
-- Name: tb_dictionarys tb_dictionarys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_dictionarys
    ADD CONSTRAINT tb_dictionarys_pkey PRIMARY KEY (id);


--
-- TOC entry 4850 (class 2606 OID 27180)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 26851)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4824 (class 2606 OID 26967)
-- Name: watch_variants watch_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 26928)
-- Name: watches watches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_pkey PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 401444)
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 401506)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4861 (class 2606 OID 401511)
-- Name: cart_items cart_items_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.watch_variants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4853 (class 2606 OID 401451)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4864 (class 2606 OID 401536)
-- Name: order_details order_details_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4865 (class 2606 OID 401541)
-- Name: order_details order_details_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.watch_variants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4866 (class 2606 OID 401548)
-- Name: order_details order_details_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4867 (class 2606 OID 401553)
-- Name: order_status_history order_status_history_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4868 (class 2606 OID 401558)
-- Name: order_status_history order_status_history_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.config_order_status(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4862 (class 2606 OID 401529)
-- Name: orders orders_current_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_current_status_id_fkey FOREIGN KEY (current_status_id) REFERENCES public.config_order_status(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4863 (class 2606 OID 401522)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4869 (class 2606 OID 401565)
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4870 (class 2606 OID 401581)
-- Name: permission_role permission_role_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4871 (class 2606 OID 401576)
-- Name: permission_role permission_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 401593)
-- Name: reviews reviews_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4873 (class 2606 OID 401588)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 401598)
-- Name: reviews reviews_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 401605)
-- Name: shipments shipments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4876 (class 2606 OID 401612)
-- Name: tokens tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4851 (class 2606 OID 401435)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 401494)
-- Name: watch_variants watch_variants_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_color_id_fkey FOREIGN KEY (color_id) REFERENCES public.colors(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4858 (class 2606 OID 401499)
-- Name: watch_variants watch_variants_strap_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_strap_material_id_fkey FOREIGN KEY (strap_material_id) REFERENCES public.strap_materials(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4859 (class 2606 OID 401489)
-- Name: watch_variants watch_variants_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4854 (class 2606 OID 401475)
-- Name: watches watches_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4855 (class 2606 OID 401470)
-- Name: watches watches_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categorys(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4856 (class 2606 OID 401480)
-- Name: watches watches_movement_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_movement_type_id_fkey FOREIGN KEY (movement_type_id) REFERENCES public.movement_types(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-10-28 19:19:31

--
-- PostgreSQL database dump complete
--

